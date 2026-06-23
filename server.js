const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const querystring = require('querystring');
const url = require('url');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

// Database file paths
const DB_PATHS = {
  products: path.join(__dirname, 'database', 'products.json'),
  sellers: path.join(__dirname, 'database', 'sellers.json'),
  users: path.join(__dirname, 'database', 'users.json'),
  chats: path.join(__dirname, 'database', 'chats.json'),
  orders: path.join(__dirname, 'database', 'orders.json')
};

// Default welcome message per seller
const DEFAULT_WELCOME_MESSAGES = {
  1: "Hello! Welcome to Farmside Organics. All vegetables listed here are picked fresh this morning.",
  2: "Hi there! Looking for bulk potatoes or capsicum? Hit me up, I can offer special discounts for order quantities above 5kg.",
  3: "Namaste! Everything from Organic Oasis is certified organic. Drop any questions you have.",
  4: "Hello from Desi Harvest Co. How can we help you today?"
};

// Helper functions for Database flat-files
function readJsonFile(filePath, defaultVal = []) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
  return defaultVal;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
    return false;
  }
}

// In-Memory Database for active OTP codes
const activeOtps = new Map();

// Load Environment variables from .env file
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      const clean = line.trim();
      if (clean && !clean.startsWith('#')) {
        const index = clean.indexOf('=');
        if (index > 0) {
          const key = clean.substring(0, index).trim();
          const val = clean.substring(index + 1).trim();
          process.env[key] = val;
        }
      }
    });
  }
}
loadEnv();

// Helper to accumulate and parse JSON request bodies
function getRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
  });
}

// Twilio SMS HTTPS Sender API helper
function sendTwilioSMS(to, msgBody) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from || sid.includes('here') || token.includes('here') || from.includes('here')) {
    return Promise.reject(new Error("Twilio credentials not configured in .env file."));
  }

  const postData = querystring.stringify({ To: to, From: from, Body: msgBody });
  const auth = 'Basic ' + Buffer.from(sid + ':' + token).toString('base64');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.twilio.com',
      port: 443,
      path: `/2010-04-01/Accounts/${sid}/Messages.json`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': auth
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Twilio returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', e => reject(e));
    req.write(postData);
    req.end();
  });
}

const server = http.createServer((req, res) => {
  // CORS Headers for API requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(req.url);
  } catch (e) {
    decodedUrl = req.url;
  }
  const parsedUrl = url.parse(decodedUrl, true);
  const pathname = parsedUrl.pathname;

  // --- API ROUTE: SEND OTP ---
  if (req.method === 'POST' && pathname === '/api/send-otp') {
    getRequestBody(req).then(async (body) => {
      const phone = body.phone;
      if (!phone || phone.length < 10) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Valid phone number is required.' }));
        return;
      }

      const fullPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const otpCode = Math.floor(100000 + Math.random() * 900000);

      // Store OTP code in memory valid for 5 minutes
      activeOtps.set(fullPhone, {
        otp: otpCode,
        expires: Date.now() + 5 * 60 * 1000
      });

      console.log(`[AUTH] Generated OTP ${otpCode} for ${fullPhone}`);

      try {
        // Try sending real SMS via Twilio
        await sendTwilioSMS(fullPhone, `Your VeggieDirect verification code is: ${otpCode}`);
        console.log(`[AUTH] Real SMS successfully sent to ${fullPhone}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, isSimulated: false }));
      } catch (err) {
        console.error(`[AUTH] Failed to send real SMS. Error: ${err.message}`);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          error: `SMS Gateway Error: ${err.message}`
        }));
      }
    });
    return;
  }

  // --- API ROUTE: VERIFY OTP ---
  if (req.method === 'POST' && pathname === '/api/verify-otp') {
    getRequestBody(req).then((body) => {
      const phone = body.phone;
      const otp = parseInt(body.otp);

      if (!phone || isNaN(otp)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Phone number and 6-digit OTP code are required.' }));
        return;
      }

      const fullPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const record = activeOtps.get(fullPhone);

      if (record && record.otp === otp && record.expires > Date.now()) {
        activeOtps.delete(fullPhone); // Clean up OTP once verified

        const users = readJsonFile(DB_PATHS.users, []);
        const existingUser = users.find(u => u.phone === fullPhone);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          exists: !!existingUser, 
          user: existingUser || null 
        }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid or expired OTP verification code.' }));
      }
    });
    return;
  }

  // --- API ROUTE: GET PRODUCTS ---
  if (req.method === 'GET' && pathname === '/api/products') {
    const products = readJsonFile(DB_PATHS.products, []);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, products }));
    return;
  }

  // --- API ROUTE: GET SELLERS ---
  if (req.method === 'GET' && pathname === '/api/sellers') {
    const sellers = readJsonFile(DB_PATHS.sellers, {});
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, sellers }));
    return;
  }

  // --- API ROUTE: ADD PRODUCT ---
  if (req.method === 'POST' && pathname === '/api/products/add') {
    getRequestBody(req).then((productData) => {
      const products = readJsonFile(DB_PATHS.products, []);
      const newProduct = {
        id: productData.id || (products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1),
        name: productData.name,
        category: productData.category,
        price: productData.price,
        originalPrice: productData.originalPrice,
        discountPct: productData.discountPct || 0,
        unit: productData.unit,
        sellerId: productData.sellerId || 1,
        imageKey: productData.imageKey,
        stock: productData.stock || 0
      };
      products.unshift(newProduct);
      writeJsonFile(DB_PATHS.products, products);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, product: newProduct }));
    });
    return;
  }

  // --- API ROUTE: UPDATE PRODUCT ---
  if (req.method === 'POST' && pathname === '/api/products/update') {
    getRequestBody(req).then((updateData) => {
      const products = readJsonFile(DB_PATHS.products, []);
      const index = products.findIndex(p => p.id === updateData.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updateData };
        writeJsonFile(DB_PATHS.products, products);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Product not found' }));
      }
    });
    return;
  }

  // --- API ROUTE: DELETE PRODUCT ---
  if (req.method === 'POST' && pathname === '/api/products/delete') {
    getRequestBody(req).then((deleteData) => {
      let products = readJsonFile(DB_PATHS.products, []);
      products = products.filter(p => p.id !== deleteData.id);
      writeJsonFile(DB_PATHS.products, products);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    });
    return;
  }

  // --- API ROUTE: CREATE ORDER ---
  if (req.method === 'POST' && pathname === '/api/orders/create') {
    getRequestBody(req).then((orderData) => {
      const { items, paymentMethod, phone, total, address, deliveryFee } = orderData;
      
      // Update stocks
      const products = readJsonFile(DB_PATHS.products, []);
      items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        if (prod) {
          prod.stock = Math.max(0, prod.stock - item.quantity);
        }
      });
      writeJsonFile(DB_PATHS.products, products);

      // Save order record
      const orders = readJsonFile(DB_PATHS.orders, []);
      const newOrder = {
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        items,
        paymentMethod,
        phone,
        total,
        status: 'pending',
        address: address || '',
        deliveryFee: deliveryFee || 0,
        orderedAt: new Date().toISOString()
      };
      orders.push(newOrder);
      writeJsonFile(DB_PATHS.orders, orders);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, order: newOrder }));
    });
    return;
  }

  // --- API ROUTE: GET CHATS ---
  if (req.method === 'GET' && pathname === '/api/chats') {
    const query = parsedUrl.query;
    const phone = query.phone;
    const sellerId = parseInt(query.sellerId);

    const chatsDb = readJsonFile(DB_PATHS.chats, {});

    if (!phone) {
      if (isNaN(sellerId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'sellerId is required.' }));
        return;
      }
      const chatKeys = Object.keys(chatsDb).filter(key => key.endsWith(`_${sellerId}`));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: chatKeys.length }));
      return;
    }

    if (isNaN(sellerId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'sellerId is required.' }));
      return;
    }

    const phoneKey = phone.startsWith('+') ? phone : '+91' + phone;
    const chatKey = `${phoneKey}_${sellerId}`;

    if (!chatsDb[chatKey]) {
      // Initialize with seller welcome message
      chatsDb[chatKey] = [
        { sender: 'seller', text: DEFAULT_WELCOME_MESSAGES[sellerId] || "Hello! How can I help you today?", time: "09:00 AM" }
      ];
      writeJsonFile(DB_PATHS.chats, chatsDb);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, messages: chatsDb[chatKey] }));
    return;
  }

  // --- API ROUTE: SEND CHAT MESSAGE ---
  if (req.method === 'POST' && pathname === '/api/chats/send') {
    getRequestBody(req).then((chatData) => {
      const { phone, sellerId, sender, text } = chatData;
      if (!phone || isNaN(parseInt(sellerId)) || !sender || !text) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Missing parameters.' }));
        return;
      }

      const phoneKey = phone.startsWith('+') ? phone : '+91' + phone;
      const chatKey = `${phoneKey}_${sellerId}`;
      const chatsDb = readJsonFile(DB_PATHS.chats, {});

      if (!chatsDb[chatKey]) {
        chatsDb[chatKey] = [
          { sender: 'seller', text: DEFAULT_WELCOME_MESSAGES[sellerId] || "Hello! How can I help you today?", time: "09:00 AM" }
        ];
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      chatsDb[chatKey].push({
        sender,
        text,
        time: timeStr
      });

      writeJsonFile(DB_PATHS.chats, chatsDb);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, messages: chatsDb[chatKey] }));
    });
    return;
  }

  // --- API ROUTE: GET ORDERS ---
  if (req.method === 'GET' && pathname === '/api/orders') {
    const query = parsedUrl.query;
    const sellerId = parseInt(query.sellerId);
    
    let orders = readJsonFile(DB_PATHS.orders, []);
    
    if (!isNaN(sellerId)) {
      const products = readJsonFile(DB_PATHS.products, []);
      const sellerProductIds = new Set(products.filter(p => p.sellerId === sellerId).map(p => p.id));
      
      orders = orders.filter(order => 
        order.items.some(item => sellerProductIds.has(item.productId))
      ).map(order => {
        const sellerItems = order.items.filter(item => sellerProductIds.has(item.productId));
        return {
          ...order,
          items: sellerItems
        };
      });
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, orders }));
    return;
  }

  // --- API ROUTE: UPDATE ORDER STATUS ---
  if (req.method === 'POST' && pathname === '/api/orders/update-status') {
    getRequestBody(req).then((updateData) => {
      const { orderId, status } = updateData;
      if (isNaN(parseInt(orderId)) || !status) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'orderId and status are required.' }));
        return;
      }

      const orders = readJsonFile(DB_PATHS.orders, []);
      const order = orders.find(o => o.id === parseInt(orderId));
      if (order) {
        order.status = status;
        writeJsonFile(DB_PATHS.orders, orders);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Order not found' }));
      }
    });
    return;
  }

  // --- API ROUTE: REGISTER SELLER ---
  if (req.method === 'POST' && pathname === '/api/sellers/register') {
    getRequestBody(req).then((sellerData) => {
      const { name, phone, email, avatar, coordinates } = sellerData;
      if (!name || !phone) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Name and phone are required.' }));
        return;
      }

      const sellers = readJsonFile(DB_PATHS.sellers, {});
      
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const exists = Object.values(sellers).some(s => s.phone.replace(/[^0-9]/g, '') === cleanPhone);
      if (exists) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Seller with this mobile number already exists.' }));
        return;
      }

      const nextId = Object.keys(sellers).length > 0 ? Math.max(...Object.keys(sellers).map(Number)) + 1 : 1;
      const newSeller = {
        id: nextId,
        name: name,
        rating: 5.0,
        coordinates: coordinates || { lat: 18.9482, lng: 72.8258 },
        avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
        phone: phone.startsWith('+') ? phone : '+91 ' + phone.substring(0, 5) + ' ' + phone.substring(5),
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@veggiedirect.in`
      };

      sellers[nextId] = newSeller;
      writeJsonFile(DB_PATHS.sellers, sellers);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, seller: newSeller }));
    });
    return;
  }

  // --- API ROUTE: GET USER BY PHONE (FOR FALLBACK AUTH LOOKUP) ---
  if (req.method === 'GET' && pathname === '/api/users/by-phone') {
    const query = parsedUrl.query;
    const phone = query.phone;
    if (!phone) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Phone is required.' }));
      return;
    }
    const fullPhone = phone.startsWith('+') ? phone : '+91' + phone;
    const users = readJsonFile(DB_PATHS.users, []);
    const existingUser = users.find(u => u.phone === fullPhone);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, user: existingUser || null }));
    return;
  }

  // --- API ROUTE: REGISTER CUSTOMER ---
  if (req.method === 'POST' && pathname === '/api/users/register') {
    getRequestBody(req).then((userData) => {
      const { name, phone, email, address, pincode, coordinates } = userData;
      if (!name || !phone || !address || !pincode) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Name, phone, address, and pincode are required.' }));
        return;
      }

      const fullPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const users = readJsonFile(DB_PATHS.users, []);

      const exists = users.some(u => u.phone === fullPhone);
      if (exists) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'User already exists.' }));
        return;
      }

      const newUser = {
        phone: fullPhone,
        name,
        email: email || '',
        address,
        pincode,
        coordinates: coordinates || null,
        registeredAt: new Date().toISOString()
      };

      users.push(newUser);
      writeJsonFile(DB_PATHS.users, users);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user: newUser }));
    });
    return;
  }

  // --- API ROUTE: UPDATE USER ADDRESS ---
  if (req.method === 'POST' && pathname === '/api/users/update-address') {
    getRequestBody(req).then((updateData) => {
      const { phone, address, pincode, coordinates } = updateData;
      if (!phone || !address) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'phone and address are required.' }));
        return;
      }

      const fullPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const users = readJsonFile(DB_PATHS.users, []);
      const user = users.find(u => u.phone === fullPhone);
      if (user) {
        user.address = address;
        if (pincode) user.pincode = pincode;
        if (coordinates) user.coordinates = coordinates;
        writeJsonFile(DB_PATHS.users, users);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, address: user.address }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'User not found' }));
      }
    });
    return;
  }

  // --- API ROUTE: DELETE USER ACCOUNT ---
  if (req.method === 'POST' && pathname === '/api/users/delete') {
    getRequestBody(req).then((body) => {
      const { phone } = body;
      if (!phone) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Phone number is required.' }));
        return;
      }
      const fullPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const users = readJsonFile(DB_PATHS.users, []);
      const updatedUsers = users.filter(u => u.phone !== fullPhone);
      writeJsonFile(DB_PATHS.users, updatedUsers);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    });
    return;
  }

  // --- API ROUTE: DELETE SELLER ACCOUNT ---
  if (req.method === 'POST' && pathname === '/api/sellers/delete') {
    getRequestBody(req).then((body) => {
      const { sellerId } = body;
      if (isNaN(parseInt(sellerId))) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Seller ID is required.' }));
        return;
      }
      const sellers = readJsonFile(DB_PATHS.sellers, {});
      delete sellers[sellerId];
      writeJsonFile(DB_PATHS.sellers, sellers);

      // Clean up products listed by this seller
      let products = readJsonFile(DB_PATHS.products, []);
      products = products.filter(p => p.sellerId !== parseInt(sellerId));
      writeJsonFile(DB_PATHS.products, products);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    });
    return;
  }

  // --- STATIC FILE SERVER HANDLER ---
  let filePath = path.join(__dirname, decodedUrl === '/' ? 'index.html' : decodedUrl);
  
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file was not found.</p>', 'utf-8');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`VeggieDirect Development Server is Running!`);
  console.log(`URL: http://localhost:${PORT}/`);
  console.log(`Real SMS Endpoint: Enabled via Twilio API`);
  console.log(`Press Ctrl+C to stop the server.`);
  console.log(`==================================================\n`);
});
