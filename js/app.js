// VeggieDirect Application State and Logic

const DB = {
  get(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

function initLocalDatabase() {
  const purgeVersion = 'db_purged_mock_v3';
  if (!localStorage.getItem(purgeVersion)) {
    localStorage.removeItem('db_sellers');
    localStorage.removeItem('db_products');
    localStorage.removeItem('db_users');
    localStorage.removeItem('db_chats');
    localStorage.removeItem('db_orders');
    localStorage.setItem(purgeVersion, 'true');
  }

  if (!localStorage.getItem('db_sellers')) {
    DB.set('db_sellers', {});
  }
  if (!localStorage.getItem('db_products')) {
    DB.set('db_products', []);
  }
  if (!localStorage.getItem('db_users')) {
    DB.set('db_users', []);
  }
  if (!localStorage.getItem('db_chats')) {
    DB.set('db_chats', {});
  }
  if (!localStorage.getItem('db_orders')) {
    DB.set('db_orders', []);
  }
}

// --- Mock Database ---
const IMAGE_MAP = {
  tomato: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=500&auto=format&fit=crop&q=60',
  carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60',
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60',
  capsicum: 'https://images.unsplash.com/photo-1563513318-57482dbdd33e?w=500&auto=format&fit=crop&q=60',
  broccoli: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&auto=format&fit=crop&q=60',
  mint: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500&auto=format&fit=crop&q=60',
  ginger: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
  onion: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500&auto=format&fit=crop&q=60',
  garlic: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format&fit=crop&q=60',
  cabbage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500&auto=format&fit=crop&q=60',
  cauliflower: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ecf?w=500&auto=format&fit=crop&q=60',
  mushroom: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60',
  peas: 'https://images.unsplash.com/photo-1592394503753-296b1182b57f?w=500&auto=format&fit=crop&q=60',
  lemon: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=500&auto=format&fit=crop&q=60',
  cucumber: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=500&auto=format&fit=crop&q=60',
  eggplant: 'https://images.unsplash.com/photo-1590371891604-ef1458133aae?w=500&auto=format&fit=crop&q=60'
};

function getFallbackSvg(key) {
  let bgColor = '#e8f7ee';
  let primaryColor = '#1e5e3a';
  let accentColor = '#4ebe7e';
  let iconPath = '';
  
  if (key === 'tomato') {
    bgColor = '#ffebee';
    primaryColor = '#c62828';
    accentColor = '#ff5a5a';
    iconPath = `<circle cx="50" cy="55" r="22" fill="${primaryColor}"/><path d="M50 25 C47 25 45 28 50 32 C55 28 53 25 50 25 Z" fill="#2e7d32"/><circle cx="42" cy="48" r="4" fill="${accentColor}" opacity="0.6"/>`;
  } else if (key === 'carrot') {
    bgColor = '#fff3e0';
    primaryColor = '#ef6c00';
    accentColor = '#ffb74d';
    iconPath = `<path d="M50 28 L40 68 C38 75 45 80 50 82 C55 80 62 75 60 68 Z" fill="${primaryColor}"/><path d="M50 28 Q45 15 35 20 Q48 10 50 28 Q52 10 65 20 Q55 15 50 28 Z" fill="#2e7d32"/>`;
  } else if (key === 'potato') {
    bgColor = '#efebe9';
    primaryColor = '#8d6e63';
    accentColor = '#bcaaa4';
    iconPath = `<ellipse cx="50" cy="52" rx="25" ry="18" fill="${primaryColor}"/><circle cx="40" cy="46" r="2" fill="#5d4037"/><circle cx="55" cy="57" r="2" fill="#5d4037"/><circle cx="62" cy="47" r="1.5" fill="#5d4037"/>`;
  } else if (key === 'lemon') {
    bgColor = '#fffde7';
    primaryColor = '#fbc02d';
    accentColor = '#fff59d';
    iconPath = `<ellipse cx="50" cy="52" rx="22" ry="16" fill="${primaryColor}"/><circle cx="38" cy="48" r="3" fill="${accentColor}" opacity="0.6"/><path d="M26 52 Q28 50 30 52 L28 52 Z" fill="${primaryColor}"/>`;
  } else if (key === 'spinach' || key === 'mint' || key === 'cabbage') {
    bgColor = '#e8f5e9';
    primaryColor = '#2e7d32';
    accentColor = '#81c784';
    iconPath = `<path d="M50 25 C65 35 65 65 50 78 C35 65 35 35 50 25 Z" fill="${primaryColor}"/><path d="M50 25 C58 32 58 52 50 62 C42 52 42 32 50 25 Z" fill="${accentColor}" opacity="0.5"/><path d="M50 25 L50 78" stroke="${primaryColor}" stroke-width="2"/>`;
  } else if (key === 'onion') {
    bgColor = '#f3e5f5';
    primaryColor = '#8e24aa';
    accentColor = '#ba68c8';
    iconPath = `<path d="M50 28 C62 28 72 40 72 58 C72 73 62 78 50 78 C38 78 28 73 28 58 C28 40 38 28 50 28 Z" fill="${primaryColor}"/><path d="M50 22 L50 28" stroke="#2e7d32" stroke-width="3"/><path d="M42 78 Q50 81 58 78" stroke="#ffe082" stroke-width="3" fill="none"/>`;
  } else if (key === 'capsicum') {
    bgColor = '#e8f5e9';
    primaryColor = '#1b5e20';
    accentColor = '#81c784';
    iconPath = `<rect x="34" y="36" width="32" height="36" rx="8" fill="${primaryColor}"/><path d="M50 22 Q48 18 52 18 C50 22 50 36 50 36" stroke="#33691e" stroke-width="4" fill="none"/>`;
  } else if (key === 'broccoli') {
    bgColor = '#e8f5e9';
    primaryColor = '#1b5e20';
    accentColor = '#81c784';
    iconPath = `<circle cx="40" cy="45" r="14" fill="${primaryColor}"/><circle cx="60" cy="45" r="14" fill="${primaryColor}"/><circle cx="50" cy="38" r="16" fill="${primaryColor}"/><rect x="46" y="55" width="8" height="20" fill="#8d6e63"/>`;
  } else if (key === 'peas') {
    bgColor = '#e8f5e9';
    primaryColor = '#2e7d32';
    accentColor = '#a5d6a7';
    iconPath = `<path d="M25 50 Q50 35 75 50 Q50 65 25 50 Z" fill="${primaryColor}"/><circle cx="38" cy="50" r="5" fill="${accentColor}"/><circle cx="50" cy="50" r="5" fill="${accentColor}"/><circle cx="62" cy="50" r="5" fill="${accentColor}"/>`;
  } else if (key === 'cucumber') {
    bgColor = '#e8f5e9';
    primaryColor = '#1b5e20';
    accentColor = '#81c784';
    iconPath = `<rect x="25" y="44" width="50" height="14" rx="7" transform="rotate(-15 50 50)" fill="${primaryColor}"/><circle cx="36" cy="46" r="2" fill="${accentColor}"/><circle cx="48" cy="44" r="2" fill="${accentColor}"/><circle cx="60" cy="42" r="2" fill="${accentColor}"/>`;
  } else if (key === 'eggplant') {
    bgColor = '#f3e5f5';
    primaryColor = '#4a148c';
    accentColor = '#ea80fc';
    iconPath = `<path d="M50 32 C62 32 70 45 70 65 C70 78 60 82 50 82 C40 82 30 78 30 65 C30 45 38 32 50 32 Z" fill="${primaryColor}"/><path d="M50 24 Q48 18 52 18 C50 24 50 32 50 32" stroke="#33691e" stroke-width="4" fill="none"/><path d="M42 34 C44 30 56 30 58 34" fill="#33691e"/>`;
  } else if (key === 'ginger') {
    bgColor = '#efebe9';
    primaryColor = '#d7ccc8';
    accentColor = '#8d6e63';
    iconPath = `<path d="M30 45 Q40 40 50 48 Q60 42 70 46 L75 52 Q62 55 52 50 Q42 56 32 50 Z" fill="${primaryColor}" stroke="${accentColor}" stroke-width="2"/>`;
  } else if (key === 'garlic') {
    bgColor = '#fafafa';
    primaryColor = '#f5f5f5';
    accentColor = '#e0e0e0';
    iconPath = `<path d="M50 28 C60 28 68 38 68 62 C68 76 60 78 50 78 C40 78 32 76 32 62 C32 38 40 28 50 28 Z" fill="${primaryColor}" stroke="${accentColor}" stroke-width="2"/><path d="M50 28 L50 78" stroke="${accentColor}" stroke-width="1.5"/>`;
  } else if (key === 'mushroom') {
    bgColor = '#f5f5f5';
    primaryColor = '#d7ccc8';
    accentColor = '#f5f5f5';
    iconPath = `<path d="M28 50 C28 30 72 30 72 50 Z" fill="${primaryColor}"/><rect x="44" y="50" width="12" height="22" rx="4" fill="${accentColor}"/>`;
  } else {
    iconPath = `<path d="M50 25 C62 35 62 65 50 75 C38 65 38 35 50 25 Z" fill="${primaryColor}"/><path d="M50 25 L50 75" stroke="${accentColor}" stroke-width="2"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="${bgColor}"/>${iconPath}</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function getSellerFallbackAvatar(sellerId) {
  const sellerColors = ['#1e5e3a', '#ef6c00', '#2b6cb0', '#8e24aa', '#c53030', '#319795'];
  const color = sellerColors[(sellerId || 1) % sellerColors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="${color}"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="700" font-size="44" fill="#ffffff">S${sellerId}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

let sellers = {};
let products = [];

// Haversine Distance Helper
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined ||
      lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
    return 1.0;
  }
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Coordinate mapping based on pincode
function getCoordinatesFromPincode(pincode) {
  const pin = String(pincode).trim();
  if (pin === '400001' || pin === '400002') {
    return { lat: 18.9388, lng: 72.8353 }; // Mumbai Fort area
  } else if (pin === '416234') {
    return { lat: 16.6385, lng: 74.2707 }; // Kolhapur
  }
  return { lat: 18.9482, lng: 72.8258 }; // Default Mumbai Kalbadevi
}

// User location initializer
async function initUserLocation() {
  if (currentUserCoordinates) {
    return;
  }
  const pincode = localStorage.getItem('currentUserPincode');
  if (pincode) {
    currentUserCoordinates = getCoordinatesFromPincode(pincode);
    localStorage.setItem('currentUserCoordinates', JSON.stringify(currentUserCoordinates));
    return;
  }
  // Try Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentUserCoordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        localStorage.setItem('currentUserCoordinates', JSON.stringify(currentUserCoordinates));
        renderProducts();
        updateCartUI();
      },
      (error) => {
        console.warn("Geolocation fallback applied:", error);
        currentUserCoordinates = { lat: 18.9482, lng: 72.8258 };
        localStorage.setItem('currentUserCoordinates', JSON.stringify(currentUserCoordinates));
      }
    );
  }
}

// Load dynamic data from persistent backend API
async function loadSellersAndProducts() {
  try {
    const [sellersRes, productsRes] = await Promise.all([
      fetch('/api/sellers').then(r => r.json()),
      fetch('/api/products').then(r => r.json())
    ]);
    if (sellersRes.success) {
      sellers = sellersRes.sellers;
    }
    if (productsRes.success) {
      products = productsRes.products;
    }
    await verifySessionIntegrity();
  } catch (err) {
    console.error("Error loading products/sellers from backend API:", err);
    showToast("Failed to load catalog data.", "error");
  }
}

function forceSessionLogout() {
  currentUserPhone = null;
  currentUserRole = 'customer';
  currentSellerId = null;
  currentUserCoordinates = null;
  localStorage.removeItem('currentUserPhone');
  localStorage.removeItem('currentUserRole');
  localStorage.removeItem('currentSellerId');
  localStorage.removeItem('currentUserName');
  localStorage.removeItem('currentUserEmail');
  localStorage.removeItem('currentUserAddress');
  localStorage.removeItem('currentUserPincode');
  localStorage.removeItem('currentUserCoordinates');
  initAuthUI();
  switchRole('customer');
  renderProducts();
}

async function verifySessionIntegrity() {
  if (currentUserRole === 'seller' && currentSellerId !== null) {
    if (!sellers[currentSellerId]) {
      console.warn("Seller session invalid: profile not found on server. Logging out.");
      showToast("Session expired: Seller profile not found on server. Please sign in again.", "warning");
      forceSessionLogout();
    }
  } else if (currentUserRole === 'customer' && currentUserPhone !== null) {
    try {
      const userRes = await fetch(`/api/users/by-phone?phone=${encodeURIComponent(currentUserPhone)}`).then(r => r.json());
      if (!userRes.success || !userRes.user) {
        console.warn("Customer session invalid: profile not found on server. Logging out.");
        showToast("Session expired: Customer profile not found on server. Please sign in again.", "warning");
        forceSessionLogout();
      }
    } catch (e) {
      console.error("Failed to verify customer session:", e);
    }
  }
}

// --- Application State ---
let cart = [];
let activePromo = null;
let activeCategory = 'all';
let searchQuery = '';
let currentRole = 'customer';
let activeChatSellerId = null;
let activeCallSellerId = null;
let callInterval = null;
let callDuration = 0;

// User Auth State
let currentUserPhone = localStorage.getItem('currentUserPhone') || null;
let currentUserRole = localStorage.getItem('currentUserRole') || 'customer';
let currentSellerId = localStorage.getItem('currentSellerId') ? parseInt(localStorage.getItem('currentSellerId')) : null;
let loginRole = 'customer'; // active tab in login modal
let generatedOtp = null;
let tempMobile = '';
let otpTimerInterval = null;
let selectedPaymentMethod = 'cod';

// User GPS Coordinates
let currentUserCoordinates = null;
try {
  const storedCoords = localStorage.getItem('currentUserCoordinates');
  if (storedCoords) {
    currentUserCoordinates = JSON.parse(storedCoords);
  }
} catch (e) {
  console.error("Error reading coordinates:", e);
}

// Bargaining & Freshness State
let activeBargainProductId = null;
let bargainCounterPrice = null;
let negotiatedPrices = {};

// --- DOM Elements ---
const customerPanel = document.getElementById('customerPanel');
const sellerPanel = document.getElementById('sellerPanel');
const customerToggleBtn = document.getElementById('customerToggleBtn');
const sellerToggleBtn = document.getElementById('sellerToggleBtn');
const productGrid = document.getElementById('productGrid');
const categoryContainer = document.getElementById('categoryContainer');
const searchInput = document.getElementById('searchInput');

// Cart Drawer elements
const cartSidebar = document.getElementById('cartSidebar');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartBadgeCount = document.getElementById('cartBadgeCount');
const billSubtotal = document.getElementById('billSubtotal');
const billDiscount = document.getElementById('billDiscount');
const billDiscountRow = document.getElementById('billDiscountRow');
const billDelivery = document.getElementById('billDelivery');
const billGrandTotal = document.getElementById('billGrandTotal');
const promoInput = document.getElementById('promoInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Chat elements
const chatDrawer = document.getElementById('chatDrawer');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatSellerName = document.getElementById('chatSellerName');
const chatAvatar = document.getElementById('chatAvatar');
const chatMessages = document.getElementById('chatMessages');
const chatInputField = document.getElementById('chatInputField');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatTypingIndicator = document.getElementById('chatTypingIndicator');
const chatCallBtn = document.getElementById('chatCallBtn');
const chatWhatsAppBtn = document.getElementById('chatWhatsAppBtn');
const chatCenterBtn = document.getElementById('chatCenterBtn');
const chatBadge = document.getElementById('chatBadge');

// Call elements
const callModal = document.getElementById('callModal');
const callAvatar = document.getElementById('callAvatar');
const callName = document.getElementById('callName');
const callStatus = document.getElementById('callStatus');
const declineCallBtn = document.getElementById('declineCallBtn');
const acceptCallBtn = document.getElementById('acceptCallBtn');

// Dashboard elements
const addProductForm = document.getElementById('addProductForm');
const sellerListingsTable = document.getElementById('sellerListingsTable');
const dashboardActiveChats = document.getElementById('dashboardActiveChats');
const dashboardTotalProducts = document.getElementById('dashboardTotalProducts');

// General elements
const modalOverlay = document.getElementById('modalOverlay');
const toastContainer = document.getElementById('toastContainer');
const heroPromoBtn = document.getElementById('heroPromoBtn');

// Authentication elements
const loginHeaderBtn = document.getElementById('loginHeaderBtn');
const userProfileBadge = document.getElementById('userProfileBadge');
const userPhoneDisplay = document.getElementById('userPhoneDisplay');
const logoutBtn = document.getElementById('logoutBtn');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const loginModal = document.getElementById('loginModal');

// Custom Dialog elements
const customDialogModal = document.getElementById('customDialogModal');
const dialogTitle = document.getElementById('dialogTitle');
const dialogMessage = document.getElementById('dialogMessage');
const dialogInputWrapper = document.getElementById('dialogInputWrapper');
const dialogInput = document.getElementById('dialogInput');
const dialogCancelBtn = document.getElementById('dialogCancelBtn');
const dialogConfirmBtn = document.getElementById('dialogConfirmBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');
const loginMobile = document.getElementById('loginMobile');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const loginStepMobile = document.getElementById('loginStepMobile');
const loginStepOtp = document.getElementById('loginStepOtp');
const sentMobileDisplay = document.getElementById('sentMobileDisplay');
const otpTimer = document.getElementById('otpTimer');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const otpInputFields = document.querySelectorAll('.otp-input-field');

// Payment Selection elements
const payMethodCod = document.getElementById('payMethodCod');
const payMethodOnline = document.getElementById('payMethodOnline');
const paymentGatewayModal = document.getElementById('paymentGatewayModal');
const gatewayAmount = document.getElementById('gatewayAmount');
const submitPaymentBtn = document.getElementById('submitPaymentBtn');
const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
const upiIdInput = document.getElementById('upiIdInput');

// Price Bargaining elements
const bargainModal = document.getElementById('bargainModal');
const closeBargainBtn = document.getElementById('closeBargainBtn');
const bargainProdImg = document.getElementById('bargainProdImg');
const bargainProdTitle = document.getElementById('bargainProdTitle');
const bargainSellerName = document.getElementById('bargainSellerName');
const bargainOriginalPrice = document.getElementById('bargainOriginalPrice');
const bargainOfferVal = document.getElementById('bargainOfferVal');
const bargainSlider = document.getElementById('bargainSlider');
const bargainMinBound = document.getElementById('bargainMinBound');
const bargainMaxBound = document.getElementById('bargainMaxBound');
const bargainDialogueText = document.getElementById('bargainDialogueText');
const submitBargainBtn = document.getElementById('submitBargainBtn');
const acceptBargainCounterBtn = document.getElementById('acceptBargainCounterBtn');
const rejectBargainCounterBtn = document.getElementById('rejectBargainCounterBtn');
const bargainActionRow = document.getElementById('bargainActionRow');
const bargainCounterRow = document.getElementById('bargainCounterRow');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  await loadSellersAndProducts();
  await initUserLocation();
  calculateFreshness();
  setupEventListeners();
  initAuthUI();
  
  // Restore active user role view
  if (currentUserRole === 'seller' && currentSellerId) {
    switchRole('seller');
  } else {
    switchRole('customer');
  }
  
  updateCartUI();
});

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Role Switcher Toggle
  customerToggleBtn.addEventListener('click', () => switchRole('customer'));
  sellerToggleBtn.addEventListener('click', () => switchRole('seller'));

  // Search input change
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderProducts();
  });

  // Category selection clicks
  categoryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-tag')) {
      document.querySelectorAll('.category-tag').forEach(tag => tag.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.getAttribute('data-category');
      renderProducts();
    }
  });

  // Cart open/close triggers
  cartToggleBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  modalOverlay.addEventListener('click', () => {
    closeCart();
    closeCallModal();
    closeLoginModal();
    closePaymentGateway();
  });

  // Cart operations
  applyPromoBtn.addEventListener('click', handleApplyPromo);
  checkoutBtn.addEventListener('click', handleCheckout);

  // Chat panel operations
  closeChatBtn.addEventListener('click', closeChat);
  chatSendBtn.addEventListener('click', sendChatMessage);
  chatInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  // Chat Actions (Call & WhatsApp)
  chatCallBtn.addEventListener('click', () => startVoiceCall(activeChatSellerId));
  chatWhatsAppBtn.addEventListener('click', () => triggerWhatsAppDirect(activeChatSellerId));
  chatCenterBtn.addEventListener('click', () => {
    // Open inbox with first seller
    openChatDrawer(1);
  });

  // Call modal button actions
  declineCallBtn.addEventListener('click', closeCallModal);
  acceptCallBtn.addEventListener('click', acceptVoiceCall);

  // Hero Claim Button
  heroPromoBtn.addEventListener('click', () => {
    openCart();
    promoInput.value = 'FRESH50';
    handleApplyPromo();
  });

  // Promo Code Cards Click (Auto apply)
  document.getElementById('promoFresh50').addEventListener('click', () => applyCodeFromCard('FRESH50'));
  document.getElementById('promoBogo').addEventListener('click', () => applyCodeFromCard('VEGGIEBOGO'));
  document.getElementById('promoFreeDel').addEventListener('click', () => applyCodeFromCard('DELFREE'));

  // Seller Dashboard New product creation
  addProductForm.addEventListener('submit', handleAddProduct);

  // Authentication Event Listeners
  loginHeaderBtn.addEventListener('click', openLoginModal);
  closeLoginBtn.addEventListener('click', closeLoginModal);
  logoutBtn.addEventListener('click', handleLogout);
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', handleDeleteAccount);
  }
  sendOtpBtn.addEventListener('click', handleSendOtp);
  verifyOtpBtn.addEventListener('click', handleVerifyOtp);
  resendOtpBtn.addEventListener('click', handleSendOtp);

  // Tab switching in Auth modal
  document.getElementById('loginTabCustomer').addEventListener('click', () => switchLoginTab('customer'));
  document.getElementById('loginTabSeller').addEventListener('click', () => switchLoginTab('seller'));

  // Seller registration submission
  document.getElementById('registerSellerSubmitBtn').addEventListener('click', handleRegisterSellerSubmit);

  // Customer registration submission
  document.getElementById('registerCustSubmitBtn').addEventListener('click', handleRegisterCustomerSubmit);

  // Edit address button inside cart drawer
  document.getElementById('editCartAddressBtn').addEventListener('click', handleEditCartAddress);

  // Auto-advance cursor in OTP inputs
  otpInputFields.forEach((field, idx) => {
    field.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
      if (e.target.value.length === 1 && idx < otpInputFields.length - 1) {
        otpInputFields[idx + 1].focus();
      }
    });
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value.length === 0 && idx > 0) {
        otpInputFields[idx - 1].focus();
      }
    });
  });

  // Payment Selection Listeners
  payMethodCod.addEventListener('click', () => switchPaymentMethod('cod'));
  payMethodOnline.addEventListener('click', () => switchPaymentMethod('online'));
  submitPaymentBtn.addEventListener('click', handleOnlinePaymentSubmit);
  cancelPaymentBtn.addEventListener('click', closePaymentGateway);

  // Price Bargaining Event Listeners
  closeBargainBtn.addEventListener('click', closeBargainModal);
  bargainSlider.addEventListener('input', handleBargainSliderChange);
  submitBargainBtn.addEventListener('click', handleBargainOfferSubmit);
  acceptBargainCounterBtn.addEventListener('click', acceptBargainCounter);
  rejectBargainCounterBtn.addEventListener('click', rejectBargainCounter);

  // Geolocation detector buttons
  const detectLocationBtn = document.getElementById('detectLocationBtn');
  if (detectLocationBtn) {
    detectLocationBtn.addEventListener('click', () => {
      showToast("Fetching GPS Coordinates...", "info");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.getElementById('registerCustLat').value = position.coords.latitude.toFixed(6);
          document.getElementById('registerCustLng').value = position.coords.longitude.toFixed(6);
          showToast("GPS location captured successfully!", "success");
        },
        (error) => {
          console.error("GPS capture error:", error);
          showToast("Failed to fetch GPS coordinates. Please allow location access or type pincode.", "error");
        }
      );
    });
  }

  const detectSellerLocationBtn = document.getElementById('detectSellerLocationBtn');
  if (detectSellerLocationBtn) {
    detectSellerLocationBtn.addEventListener('click', () => {
      showToast("Fetching GPS Coordinates...", "info");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.getElementById('registerFarmLat').value = position.coords.latitude.toFixed(6);
          document.getElementById('registerFarmLng').value = position.coords.longitude.toFixed(6);
          showToast("GPS location captured successfully!", "success");
        },
        (error) => {
          console.error("GPS capture error:", error);
          showToast("Failed to fetch GPS coordinates. Please allow location access.", "error");
        }
      );
    });
  }

  // Profile dots option dropdown toggle
  const profileDotsBtn = document.getElementById('profileDotsBtn');
  const profileDropdownMenu = document.getElementById('profileDropdownMenu');
  if (profileDotsBtn && profileDropdownMenu) {
    profileDotsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdownMenu.classList.toggle('open');
      profileDropdownMenu.style.display = profileDropdownMenu.classList.contains('open') ? 'flex' : 'none';
    });
    document.addEventListener('click', () => {
      profileDropdownMenu.classList.remove('open');
      profileDropdownMenu.style.display = 'none';
    });
  }

  // Bind Enter keys to primary button clicks for autofocusable inputs
  loginMobile.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendOtpBtn.click();
    }
  });

  otpInputFields.forEach(field => {
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        verifyOtpBtn.click();
      }
    });
  });

  const customerRegInputs = document.querySelectorAll('#loginStepCustomerRegister input');
  customerRegInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('registerCustSubmitBtn').click();
      }
    });
  });

  const sellerRegInputs = document.querySelectorAll('#loginStepSellerRegister input');
  sellerRegInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('registerSellerSubmitBtn').click();
      }
    });
  });

  dialogInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dialogConfirmBtn.click();
    }
  });

  bargainModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (bargainCounterRow.style.display === 'grid') {
        acceptBargainCounterBtn.click();
      } else {
        submitBargainBtn.click();
      }
    }
  });

  // Enforce digits-only on number textboxes
  loginMobile.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  });

  const registerCustPincode = document.getElementById('registerCustPincode');
  if (registerCustPincode) {
    registerCustPincode.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  const paymentCardNumber = document.getElementById('paymentCardNumber');
  if (paymentCardNumber) {
    paymentCardNumber.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  const paymentExpiry = document.getElementById('paymentExpiry');
  if (paymentExpiry) {
    paymentExpiry.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9/]/g, '');
    });
  }

  const paymentCvv = document.getElementById('paymentCvv');
  if (paymentCvv) {
    paymentCvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  // Enforce numbers and decimals on coordinate textboxes
  ['registerCustLat', 'registerCustLng', 'registerFarmLat', 'registerFarmLng'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, '');
      });
    }
  });
}

// --- Role Switcher (Customer <-> Seller) ---
function switchRole(role) {
  if (role === 'seller') {
    if (currentUserRole !== 'seller' || !currentSellerId) {
      showToast("Please log in with a Seller account to access the dashboard!", "warning");
      openLoginModal();
      switchLoginTab('seller');
      return;
    }
  }

  currentRole = role;
  if (role === 'customer') {
    customerToggleBtn.classList.add('active');
    sellerToggleBtn.classList.remove('active');
    customerPanel.classList.add('active');
    sellerPanel.classList.remove('active');
    showToast("Switched to Customer App View", "info");
    renderProducts();
  } else {
    customerToggleBtn.classList.remove('active');
    sellerToggleBtn.classList.add('active');
    customerPanel.classList.remove('active');
    sellerPanel.classList.add('active');
    showToast("Switched to Seller Dashboard Panel", "info");
    
    // Customize welcome message on the seller panel header
    const seller = sellers[currentSellerId];
    if (seller) {
      document.querySelector('.dashboard-header strong').innerText = seller.name;
    }

    updateSellerDashboardStats();
    updateSellerDashboardListings();
    renderSellerOrders();
  }
}

// Helper to apply codes directly from UI banners
function applyCodeFromCard(code) {
  openCart();
  promoInput.value = code;
  handleApplyPromo();
}

// --- Render Product Cards ---
function renderProducts() {
  productGrid.innerHTML = '';
  
  // Calculate freshness levels first
  calculateFreshness();
  
  // Filter products based on category and search query
  const filtered = products.filter(p => {
    const seller = sellers[p.sellerId];
    if (!seller) return false;
    const matchesCategory = (activeCategory === 'all') || (p.category === activeCategory);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery) || 
                          seller.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Calculate dynamic distance for each product from user location and sort
  const userLat = currentUserCoordinates ? currentUserCoordinates.lat : 18.9482;
  const userLng = currentUserCoordinates ? currentUserCoordinates.lng : 72.8258;

  filtered.forEach(p => {
    const seller = sellers[p.sellerId];
    if (seller && seller.coordinates) {
      p.distanceKm = calculateDistance(userLat, userLng, seller.coordinates.lat, seller.coordinates.lng);
    } else {
      p.distanceKm = 1.0;
    }
  });

  // Sort closest first
  filtered.sort((a, b) => a.distanceKm - b.distanceKm);

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
        <i class="fa-solid fa-face-sad-tear fa-3x" style="margin-bottom: 1rem; color: var(--border-color);"></i>
        <p style="font-weight: 600;">No vegetables found matching your filters!</p>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const seller = sellers[p.sellerId];
    const cartItem = cart.find(item => item.productId === p.id);
    const inCartQty = cartItem ? cartItem.quantity : 0;
    
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Calculate display rating stars
    let ratingStars = '';
    const fullStars = Math.floor(seller.rating);
    for (let i = 0; i < fullStars; i++) ratingStars += '<i class="fa-solid fa-star"></i>';
    if (seller.rating % 1 !== 0) ratingStars += '<i class="fa-solid fa-star-half-stroke"></i>';

    // Freshness indicator styling
    const freshnessColor = p.freshnessPct > 80 ? 'var(--accent-color)' : p.freshnessPct > 55 ? 'var(--warning-color)' : 'var(--danger-color)';

    // Check if there is an active negotiated price
    const hasNegotiatedPrice = negotiatedPrices[p.id] !== undefined;
    const displayPrice = hasNegotiatedPrice 
      ? `<span style="color:#ff8f00; font-weight:800;">₹${negotiatedPrices[p.id]}</span> <span style="font-size:0.75rem; text-decoration:line-through; color:var(--text-secondary); margin-left:0.2rem;">₹${p.price}</span>`
      : `<span class="current-price">₹${p.price}</span>`;

    card.innerHTML = `
      ${p.discountPct > 0 ? `<div class="product-discount-label">${p.discountPct}% OFF</div>` : ''}
      <div class="product-img-box">
        <img src="${IMAGE_MAP[p.imageKey] || IMAGE_MAP.tomato}" onerror="this.onerror=null; this.src=getFallbackSvg('${p.imageKey}')" alt="${p.name}">
        <div class="product-freshness-wrapper">
          <div class="freshness-bar-fill" style="width: ${p.freshnessPct}%; background: ${freshnessColor};"></div>
          <span class="freshness-text"><i class="fa-solid fa-leaf"></i> ${p.freshnessPct}% Fresh (Harvested ${p.harvestTimeText} ago)</span>
        </div>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-category">${p.category}</span>
          <span class="product-seller-info"><i class="fa-solid fa-location-dot"></i> ${p.distanceKm.toFixed(2)} km</span>
        </div>
        <h3 class="product-title">${p.name}</h3>
        
        <div class="seller-profile-inline">
          <span class="seller-name"><i class="fa-solid fa-store" style="color: var(--primary-light);"></i> ${seller.name}</span>
          <div class="seller-rating">
            ${ratingStars}
            <span style="color: var(--text-secondary); font-size: 0.75rem;">(${seller.rating})</span>
          </div>
        </div>

        <div class="product-pricing-box">
          ${displayPrice}
          ${p.discountPct > 0 && !hasNegotiatedPrice ? `<span class="original-price">₹${p.originalPrice}</span>` : ''}
          <span class="unit-label">/ ${p.unit}</span>
          ${hasNegotiatedPrice ? `<span class="negotiated-price-badge">Bargained Deal</span>` : ''}
        </div>

        <div class="product-action-row" id="action-row-${p.id}" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: auto;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem;">
            <button class="seller-connect-btn" onclick="openChatDrawer(${seller.id})" title="Contact Seller Directly">
              <i class="fa-solid fa-comments"></i> Chat
            </button>
            <button class="seller-connect-btn" onclick="openBargainModal(${p.id})" style="background: #fff8e1; border-color: #ffe082; color: #ff8f00;" title="Negotiate Price with Farmer">
              <i class="fa-solid fa-handshake"></i> Bargain
            </button>
          </div>
          
          ${inCartQty > 0 ? `
            <div class="quantity-adjuster">
              <button onclick="changeQty(${p.id}, -1)">-</button>
              <div class="quantity-value">${inCartQty}</div>
              <button onclick="changeQty(${p.id}, 1)">+</button>
            </div>
          ` : `
            <button class="add-cart-btn" onclick="addToCart(${p.id})">
              <i class="fa-solid fa-plus"></i> Add to Cart
            </button>
          `}
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// --- Shopping Cart Functions ---
function openCart() {
  cartSidebar.classList.add('open');
  modalOverlay.classList.add('open');
}

function closeCart() {
  cartSidebar.classList.remove('open');
  modalOverlay.classList.remove('open');
}

function addToCart(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  if (prod.stock <= 0) {
    showToast("Sorry, this item is out of stock!", "error");
    return;
  }

  cart.push({ productId, quantity: 1 });
  showToast(`Added ${prod.name} to basket!`, "success");
  updateCartUI();
  renderProducts();
}

function changeQty(productId, delta) {
  const itemIndex = cart.findIndex(item => item.productId === productId);
  if (itemIndex === -1) return;

  const prod = products.find(p => p.id === productId);
  const currentQty = cart[itemIndex].quantity;
  const newQty = currentQty + delta;

  if (newQty > prod.stock) {
    showToast(`Only ${prod.stock} ${prod.unit} available in stock!`, "warning");
    return;
  }

  if (newQty <= 0) {
    cart.splice(itemIndex, 1);
    showToast(`Removed ${prod.name} from basket`, "info");
  } else {
    cart[itemIndex].quantity = newQty;
  }

  updateCartUI();
  renderProducts();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadgeCount.innerText = totalCount;
  
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Your basket is empty!</p>
        <p style="font-size: 0.85rem; opacity: 0.7;">Add fresh vegetables to claim discounts.</p>
      </div>
    `;
    billSubtotal.innerText = "₹0";
    billDiscountRow.style.display = "none";
    billDelivery.innerText = "₹0";
    billGrandTotal.innerText = "₹0";
    return;
  }

  // Populate items
  cartItemsList.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const prod = products.find(p => p.id === item.productId);
    const seller = sellers[prod.sellerId] || { name: 'Unknown Store' };
    const activePrice = negotiatedPrices[prod.id] !== undefined ? negotiatedPrices[prod.id] : prod.price;
    const cost = activePrice * item.quantity;
    subtotal += cost;

    const div = document.createElement('div');
    div.className = 'cart-item';
    
    const priceDisplayHtml = negotiatedPrices[prod.id] !== undefined
      ? `<span style="color:#ff8f00; font-weight:700;">₹${negotiatedPrices[prod.id]} <span class="negotiated-price-badge" style="font-size:0.6rem; padding:0.05rem 0.25rem;">Deal</span></span> <span style="text-decoration:line-through; font-size:0.75rem; color:var(--text-secondary);">₹${prod.price}</span>`
      : `₹${prod.price}`;

    div.innerHTML = `
      <img src="${IMAGE_MAP[prod.imageKey] || IMAGE_MAP.tomato}" onerror="this.onerror=null; this.src=getFallbackSvg('${prod.imageKey}')" class="cart-item-img" alt="${prod.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${prod.name}</div>
        <div class="cart-item-seller">Seller: ${seller.name}</div>
        <div class="cart-item-price">${priceDisplayHtml} x ${item.quantity} = ₹${cost}</div>
      </div>
      <div class="cart-item-controls">
        <div class="cart-item-qty">
          <button onclick="changeQty(${prod.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${prod.id}, 1)">+</button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(div);
  });

  // Calculate Discounts
  let discountAmount = 0;
  if (activePromo === 'FRESH50') {
    // 50% off on all organic and leafy green categories
    cart.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod.category === 'greens' || prod.category === 'organic') {
        const activePrice = negotiatedPrices[prod.id] !== undefined ? negotiatedPrices[prod.id] : prod.price;
        discountAmount += (activePrice * item.quantity) * 0.5;
      }
    });
  } else if (activePromo === 'VEGGIEBOGO') {
    // Buy 1 Get 1 Free on Potatoes (product ID 4) or Spinach (product ID 3)
    cart.forEach(item => {
      if (item.productId === 4 || item.productId === 3) {
        const prod = products.find(p => p.id === item.productId);
        const activePrice = negotiatedPrices[prod.id] !== undefined ? negotiatedPrices[prod.id] : prod.price;
        const freeItems = Math.floor(item.quantity / 2);
        discountAmount += freeItems * activePrice;
      }
    });
  }

  // Dynamic Delivery partner fee based on distance: ₹10 per km (minimum ₹10)
  let deliveryFee = 0;
  if (cart.length > 0) {
    const userLat = currentUserCoordinates ? currentUserCoordinates.lat : 18.9482;
    const userLng = currentUserCoordinates ? currentUserCoordinates.lng : 72.8258;
    let maxDistance = 0;
    
    cart.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        const seller = sellers[prod.sellerId];
        if (seller && seller.coordinates) {
          const dist = calculateDistance(userLat, userLng, seller.coordinates.lat, seller.coordinates.lng);
          if (dist > maxDistance) maxDistance = dist;
        }
      }
    });

    deliveryFee = Math.max(10, Math.round(maxDistance * 10));
  }

  if (activePromo === 'DELFREE' && subtotal >= 199) {
    deliveryFee = 0;
  }

  billSubtotal.innerText = `₹${subtotal}`;
  if (discountAmount > 0) {
    billDiscountRow.style.display = "flex";
    billDiscount.innerText = `-₹${Math.round(discountAmount)}`;
  } else {
    billDiscountRow.style.display = "none";
  }
  billDelivery.innerText = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  billGrandTotal.innerText = `₹${Math.round(grandTotal)}`;
  
  // Display/update address in cart drawer
  updateCartAddressDisplay();
}

function handleApplyPromo() {
  const code = promoInput.value.trim().toUpperCase();
  if (!code) return;

  if (cart.length === 0) {
    showToast("Please add items to your cart first!", "warning");
    return;
  }

  if (code === 'FRESH50') {
    activePromo = 'FRESH50';
    showToast("FRESH50 Applied! 50% discount on Leafy Greens & Organic items.", "success");
  } else if (code === 'VEGGIEBOGO') {
    activePromo = 'VEGGIEBOGO';
    showToast("BOGO Applied! Free potato/spinach added on buy-1-get-1 logic.", "success");
  } else if (code === 'DELFREE') {
    const subtotal = cart.reduce((sum, item) => sum + (products.find(p => p.id === item.productId).price * item.quantity), 0);
    if (subtotal >= 199) {
      activePromo = 'DELFREE';
      showToast("DELFREE Applied! Free delivery fee claimed.", "success");
    } else {
      showToast("DELFREE requires order subtotal of ₹199 or more!", "error");
    }
  } else {
    showToast("Invalid Promo Code! Please check active banners.", "error");
    activePromo = null;
  }
  updateCartUI();
}

function handleCheckout() {
  if (cart.length === 0) return;
  
  // Auth Gate check
  if (!currentUserPhone) {
    showToast("Please login with your mobile number to complete order!", "warning");
    closeCart();
    openLoginModal();
    return;
  }
  
  const totalVal = billGrandTotal.innerText;
  
  if (selectedPaymentMethod === 'cod') {
    showToast("Processing Cash on Delivery order...", "info");
    setTimeout(() => {
      finalizeCheckout("Cash on Delivery");
    }, 1500);
  } else {
    openPaymentGateway(totalVal);
  }
}

async function finalizeCheckout(payType) {
  try {
    const totalVal = parseInt(billGrandTotal.innerText.replace('₹', ''));
    const deliveryFeeText = document.getElementById('billDelivery').innerText;
    const deliveryFeeVal = deliveryFeeText === 'FREE' ? 0 : parseInt(deliveryFeeText.replace('₹', '')) || 0;

    // Check stock for all items using in-memory catalog
    for (const cartItem of cart) {
      const prod = products.find(p => p.id === cartItem.productId);
      if (!prod) {
        showToast("Product not found in catalog!", "error");
        return;
      }
      if (prod.stock < cartItem.quantity) {
        showToast(`Not enough stock for ${prod.name}!`, "error");
        return;
      }
    }

    const orderData = {
      items: JSON.parse(JSON.stringify(cart)),
      paymentMethod: payType,
      phone: currentUserPhone,
      total: totalVal,
      address: localStorage.getItem('currentUserAddress') || '',
      deliveryFee: deliveryFeeVal
    };

    showToast("Processing checkout...", "info");

    const res = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (data.success) {
      // Reload products catalog from backend to get updated stocks
      await loadSellersAndProducts();
      cart = [];
      activePromo = null;
      promoInput.value = '';
      closeCart();
      renderProducts();
      updateCartUI();
      showToast(`Order Placed Successfully via ${payType}! Seller notified.`, "success");
    } else {
      showToast(data.error || "Failed to place order.", "error");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    showToast("Error processing checkout.", "error");
  }
}

// --- Live Chat Drawer Functions ---
function openChatDrawer(sellerId) {
  // Auth Gate check
  if (!currentUserPhone) {
    showToast("Please login to contact vegetable sellers!", "warning");
    openLoginModal();
    return;
  }

  const seller = sellers[sellerId];
  if (!seller) return;

  activeChatSellerId = sellerId;
  chatSellerName.innerText = seller.name;
  chatAvatar.src = seller.avatar;
  chatAvatar.onerror = function() {
    this.onerror = null;
    this.src = getSellerFallbackAvatar(seller.id);
  };
  
  // Render messages
  renderChatMessages(sellerId);
  chatDrawer.classList.add('open');
  
  // Set chat badge back to 0
  chatBadge.style.display = "none";
}

function closeChat() {
  chatDrawer.classList.remove('open');
  activeChatSellerId = null;
}

async function renderChatMessages(sellerId) {
  chatMessages.innerHTML = '';
  
  try {
    const res = await fetch(`/api/chats?phone=${encodeURIComponent(currentUserPhone)}&sellerId=${sellerId}`);
    const data = await res.json();
    if (data.success) {
      const messages = data.messages || [];
      if (messages.length === 0) {
        chatMessages.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-secondary); font-size: 0.85rem;">
            No previous messages. Type below to contact vendor.
          </div>
        `;
        return;
      }

      messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message-bubble ${msg.sender === 'customer' ? 'outgoing' : 'incoming'}`;
        div.innerHTML = `
          ${msg.text}
          <span class="message-time">${msg.time}</span>
        `;
        chatMessages.appendChild(div);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  } catch (err) {
    console.error("Error loading chat messages from API:", err);
  }
}

async function sendChatMessage() {
  const text = chatInputField.value.trim();
  if (!text || !activeChatSellerId) return;

  chatInputField.value = '';

  try {
    const res = await fetch('/api/chats/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: currentUserPhone,
        sellerId: activeChatSellerId,
        sender: 'customer',
        text: text
      })
    });
    const data = await res.json();
    if (data.success) {
      await renderChatMessages(activeChatSellerId);
      simulateSellerReply(activeChatSellerId, text);
    }
  } catch (err) {
    console.error("Error sending chat message:", err);
    showToast("Failed to send message.", "error");
  }
}

function simulateSellerReply(sellerId, customerText) {
  chatTypingIndicator.style.display = "flex";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  let replyText = "Thank you for contacting us! I am currently checking the fresh stock. Let me know what quantity you require.";
  const inputLower = customerText.toLowerCase();

  if (inputLower.includes('discount') || inputLower.includes('offer') || inputLower.includes('coupon') || inputLower.includes('cheap')) {
    replyText = "We have Swiggy-like discount banners up right now! Use code FRESH50 for 50% off organic items, or VEGGIEBOGO for potato buy-1-get-1 free. I can manually lower the pricing if you purchase in bulk!";
  } else if (inputLower.includes('price') || inputLower.includes('cost') || inputLower.includes('how much')) {
    replyText = "The prices listed in our catalog are highly competitive! Tell me which item you want, and I'll see if I can offer you a farm-direct discount coupon.";
  } else if (inputLower.includes('fresh') || inputLower.includes('harvest') || inputLower.includes('organic')) {
    replyText = "Rest assured, all our greens are harvested at 5:00 AM daily. We don't use preservatives or storage refrigeration. Try the Spinach, it is extremely fresh!";
  } else if (inputLower.includes('location') || inputLower.includes('address') || inputLower.includes('where')) {
    const seller = sellers[sellerId];
    const distText = seller.distance || "1.0 km";
    replyText = `Our organic farm outlet is located just ${distText} from your location. We support express local delivery via our farm delivery partners within 30 minutes!`;
  } else if (inputLower.includes('whatsapp') || inputLower.includes('number')) {
    replyText = "Sure, you can reach out to my personal WhatsApp directly by clicking the WhatsApp icon on the top header of this chat!";
  }

  setTimeout(async () => {
    chatTypingIndicator.style.display = "none";
    try {
      const res = await fetch('/api/chats/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: currentUserPhone,
          sellerId: sellerId,
          sender: 'seller',
          text: replyText
        })
      });
      const data = await res.json();
      if (data.success) {
        if (activeChatSellerId === sellerId) {
          await renderChatMessages(sellerId);
        } else {
          chatBadge.style.display = "flex";
          chatBadge.innerText = (parseInt(chatBadge.innerText) || 0) + 1;
          showToast(`New message from ${sellers[sellerId].name}`, "info");
        }
      }
    } catch (err) {
      console.error("Error sending simulated response:", err);
    }

    // Refresh seller dashboard if active
    if (currentRole === 'seller') {
      updateSellerDashboardStats();
    }
  }, 2000);
}

// --- Voice Call Simulator ---
function startVoiceCall(sellerId) {
  // Auth Gate check
  if (!currentUserPhone) {
    showToast("Please login to initiate direct voice call!", "warning");
    openLoginModal();
    return;
  }

  const seller = sellers[sellerId];
  if (!seller) return;

  activeCallSellerId = sellerId;
  callAvatar.src = seller.avatar;
  callAvatar.onerror = function() {
    this.onerror = null;
    this.src = getSellerFallbackAvatar(seller.id);
  };
  callName.innerText = seller.name;
  callStatus.innerText = "RINGING...";
  
  // Show call modal
  callModal.classList.add('open');
  modalOverlay.classList.add('open');
  
  acceptCallBtn.style.display = "flex";

  // Simulate automatic pick-up after 3.5 seconds
  callInterval = setTimeout(() => {
    acceptVoiceCall();
  }, 3500);
}

function acceptVoiceCall() {
  if (callInterval) clearTimeout(callInterval);
  acceptCallBtn.style.display = "none";
  callStatus.innerText = "CONNECTED (00:00)";
  
  // Start counter
  callDuration = 0;
  callInterval = setInterval(() => {
    callDuration++;
    const mins = Math.floor(callDuration / 60).toString().padStart(2, '0');
    const secs = (callDuration % 60).toString().padStart(2, '0');
    callStatus.innerText = `CONNECTED (${mins}:${secs})`;

    // Simulate conversational captions on screen
    if (callDuration === 3) {
      callStatus.innerText = "CONNECTED\n\"Hello! Farm outlet speaking. Fresh harvests available today!\"";
    } else if (callDuration === 8) {
      callStatus.innerText = "CONNECTED\n\"Sure, we can deliver spinach and organic carrots in 20 mins!\"";
    } else if (callDuration === 14) {
      callStatus.innerText = "CONNECTED\n\"Check out the promo code FRESH50 in the app. Let me patch the order!\"";
    }
  }, 1000);
}

function closeCallModal() {
  if (callInterval) {
    clearInterval(callInterval);
    clearTimeout(callInterval);
  }
  callModal.classList.remove('open');
  if (!cartSidebar.classList.contains('open') && !loginModal.classList.contains('open') && !paymentGatewayModal.classList.contains('open')) {
    modalOverlay.classList.remove('open');
  }
  activeCallSellerId = null;
  showToast("Call ended", "info");
}

function triggerWhatsAppDirect(sellerId) {
  const seller = sellers[sellerId];
  const url = `https://wa.me/${seller.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(seller.name)},%20I%20saw%20your%20vegetable%20listings%20on%20VeggieDirect%20and%20want%20to%20place%20an%20order!`;
  window.open(url, '_blank');
  showToast(`Redirecting simulated WhatsApp chat with ${seller.name}`, "info");
}

// --- Seller Dashboard Controls ---
async function updateSellerDashboardStats() {
  if (!currentSellerId) return;
  const sellerProds = products.filter(p => p.sellerId === currentSellerId);
  dashboardTotalProducts.innerText = sellerProds.length;
  
  try {
    const res = await fetch(`/api/chats?sellerId=${currentSellerId}`);
    const data = await res.json();
    if (data.success) {
      dashboardActiveChats.innerText = data.count || 0;
    }
  } catch (err) {
    console.error("Error loading chat count:", err);
  }
}

function updateSellerDashboardListings() {
  if (!currentSellerId) return;
  sellerListingsTable.innerHTML = '';
  // Show product items belonging to logged-in Seller
  const sellerProds = products.filter(p => p.sellerId === currentSellerId);

  sellerProds.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="list-prod-info">
          <img src="${IMAGE_MAP[p.imageKey] || IMAGE_MAP.tomato}" onerror="this.onerror=null; this.src=getFallbackSvg('${p.imageKey}')" class="list-prod-img" alt="${p.name}">
          <div>
            <span class="list-prod-name">${p.name}</span><br>
            <span class="list-prod-cat">${p.category}</span>
          </div>
        </div>
      </td>
      <td>
        <div style="font-weight: 700;">₹${p.price}</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); text-decoration: line-through;">₹${p.originalPrice}</div>
      </td>
      <td>
        <span class="badge-discount-mini">${p.discountPct}% OFF</span>
      </td>
      <td>
        <span class="stock-tag ${p.stock > 10 ? 'in-stock' : p.stock > 0 ? 'low-stock' : 'out-stock'}">
          ${p.stock > 10 ? 'In Stock' : p.stock > 0 ? `Low Stock (${p.stock})` : 'Out of Stock'}
        </span>
      </td>
      <td>
        <div class="table-actions">
          <button class="table-action-btn" onclick="triggerSellerDiscountEdit(${p.id})" title="Adjust Discount Offer">
            <i class="fa-solid fa-percent"></i>
          </button>
          <button class="table-action-btn delete-btn" onclick="deleteSellerProduct(${p.id})" title="Remove Product">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;
    sellerListingsTable.appendChild(tr);
  });
}

async function handleAddProduct(e) {
  e.preventDefault();
  
  const name = document.getElementById('prodName').value.trim();
  const category = document.getElementById('prodCategory').value;
  const unit = document.getElementById('prodUnit').value.trim();
  const originalPrice = parseFloat(document.getElementById('prodOriginalPrice').value);
  const discount = parseInt(document.getElementById('prodDiscount').value) || 0;
  const stock = parseInt(document.getElementById('prodStock').value);
  const imageKey = document.getElementById('prodImageSelect').value;

  const currentPrice = Math.round(originalPrice * (1 - discount / 100));

  showToast("Publishing product...", "info");

  try {
    const res = await fetch('/api/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        category: category,
        price: currentPrice,
        originalPrice: originalPrice,
        discountPct: discount,
        unit: unit,
        sellerId: currentSellerId,
        imageKey: imageKey,
        stock: stock
      })
    });
    const data = await res.json();
    if (data.success) {
      await loadSellersAndProducts();
      addProductForm.reset();
      showToast(`Successfully published ${name} to customer catalog!`, "success");
      await updateSellerDashboardStats();
      updateSellerDashboardListings();
    } else {
      showToast(data.error || "Failed to publish product.", "error");
    }
  } catch (err) {
    console.error("Error adding product:", err);
    showToast("Failed to publish product to catalog.", "error");
  }
}

async function triggerSellerDiscountEdit(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  const newDiscount = await showCustomPrompt("Adjust Discount", `Update discount percentage for ${prod.name}:`, prod.discountPct);
  if (newDiscount === null) return;

  const pct = parseInt(newDiscount);
  if (isNaN(pct) || pct < 0 || pct > 95) {
    showToast("Please enter a valid discount percentage (0 to 95)!", "error");
    return;
  }

  const newPrice = Math.round(prod.originalPrice * (1 - pct / 100));
  showToast("Updating discount...", "info");

  try {
    const res = await fetch('/api/products/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: productId,
        discountPct: pct,
        price: newPrice
      })
    });
    const data = await res.json();
    if (data.success) {
      await loadSellersAndProducts();
      showToast(`Updated discount for ${prod.name} to ${pct}%!`, "success");
      updateSellerDashboardListings();
      renderProducts();
    } else {
      showToast(data.error || "Failed to update product discount.", "error");
    }
  } catch (err) {
    console.error("Error updating discount:", err);
    showToast("Failed to update product discount.", "error");
  }
}

async function deleteSellerProduct(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  if (await showCustomConfirm("Delete Product", `Are you sure you want to remove ${prod.name} from listings?`, true)) {
    showToast("Deleting product...", "info");
    try {
      const res = await fetch('/api/products/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId })
      });
      const data = await res.json();
      if (data.success) {
        await loadSellersAndProducts();
        cart = cart.filter(item => item.productId !== productId);
        showToast(`${prod.name} removed from catalog`, "info");
        await updateSellerDashboardStats();
        updateSellerDashboardListings();
        updateCartUI();
        renderProducts();
      } else {
        showToast(data.error || "Failed to delete product.", "error");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      showToast("Failed to delete product.", "error");
    }
  }
}

// --- Customer Delivery Address Helpers ---
function updateCartAddressDisplay() {
  const addressBox = document.getElementById('cartAddressBox');
  const addressName = document.getElementById('cartAddressName');
  const addressText = document.getElementById('cartAddressText');
  const cartCoordsDisplay = document.getElementById('cartCoordsDisplay');
  
  if (currentUserRole === 'customer' && currentUserPhone) {
    const name = localStorage.getItem('currentUserName') || 'Customer';
    const address = localStorage.getItem('currentUserAddress') || '';
    const pincode = localStorage.getItem('currentUserPincode') || '';
    
    if (address) {
      addressName.innerText = name;
      addressText.innerText = `${address}, Pincode: ${pincode}`;
      if (cartCoordsDisplay) {
        if (currentUserCoordinates) {
          cartCoordsDisplay.innerText = `${currentUserCoordinates.lat.toFixed(4)}, ${currentUserCoordinates.lng.toFixed(4)}`;
        } else {
          cartCoordsDisplay.innerText = 'Not Set';
        }
      }
      addressBox.style.display = 'block';
    } else {
      addressBox.style.display = 'none';
    }
  } else {
    addressBox.style.display = 'none';
  }
}

async function handleEditCartAddress() {
  const currentAddress = localStorage.getItem('currentUserAddress') || '';
  const newAddress = await showCustomPrompt("Update Address", "Enter your new delivery address:", currentAddress);
  
  if (newAddress === null) return;
  const trimmedAddress = newAddress.trim();
  if (!trimmedAddress) {
    showToast("Address cannot be empty!", "error");
    return;
  }

  showToast("Updating delivery address...", "info");

  try {
    let pin = localStorage.getItem('currentUserPincode') || '';
    let coords = currentUserCoordinates;

    // Auto detect and update pincode/coordinates if present in address
    const pincodeMatch = trimmedAddress.match(/\b\d{6}\b/);
    if (pincodeMatch) {
      pin = pincodeMatch[0];
      coords = getCoordinatesFromPincode(pin);
      currentUserCoordinates = coords;
      localStorage.setItem('currentUserPincode', pin);
      localStorage.setItem('currentUserCoordinates', JSON.stringify(currentUserCoordinates));
    }

    const res = await fetch('/api/users/update-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: currentUserPhone,
        address: trimmedAddress,
        pincode: pin,
        coordinates: coords
      })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('currentUserAddress', trimmedAddress);
      showToast("Address updated successfully!", "success");
      renderProducts();
      updateCartUI();
    } else {
      showToast(data.error || "Failed to update address.", "error");
    }
  } catch (err) {
    console.error("Error updating address:", err);
    showToast("Failed to update address.", "error");
  }
}

async function handleRegisterCustomerSubmit() {
  const custName = document.getElementById('registerCustName').value.trim();
  const custEmail = document.getElementById('registerCustEmail').value.trim();
  const custAddress = document.getElementById('registerCustAddress').value.trim();
  const custPincode = document.getElementById('registerCustPincode').value.trim();
  const custLat = parseFloat(document.getElementById('registerCustLat').value);
  const custLng = parseFloat(document.getElementById('registerCustLng').value);

  if (!custName || !custAddress || !custPincode) {
    showToast("Please enter your Name, Address, and Pincode!", "error");
    return;
  }

  let coords = null;
  if (!isNaN(custLat) && !isNaN(custLng)) {
    coords = { lat: custLat, lng: custLng };
  } else {
    coords = getCoordinatesFromPincode(custPincode);
  }

  showToast("Registering customer profile...", "info");

  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: custName,
        phone: tempMobile,
        email: custEmail,
        address: custAddress,
        pincode: custPincode,
        coordinates: coords
      })
    });
    const data = await res.json();
    if (data.success) {
      const dbUser = data.user;
      currentUserRole = 'customer';
      currentUserPhone = dbUser.phone;
      currentSellerId = null;
      currentUserCoordinates = dbUser.coordinates || coords;

      localStorage.setItem('currentUserRole', currentUserRole);
      localStorage.setItem('currentUserPhone', currentUserPhone);
      localStorage.setItem('currentUserName', dbUser.name);
      localStorage.setItem('currentUserEmail', dbUser.email || '');
      localStorage.setItem('currentUserAddress', dbUser.address);
      localStorage.setItem('currentUserPincode', dbUser.pincode);
      localStorage.setItem('currentUserCoordinates', JSON.stringify(currentUserCoordinates));
      localStorage.removeItem('currentSellerId');

      initAuthUI();
      closeLoginModal();
      showToast(`Welcome to VeggieDirect, ${dbUser.name}!`, "success");
      switchRole('customer');
    } else {
      showToast(data.error || "Failed to register customer profile.", "error");
    }
  } catch (err) {
    console.error("Customer registration error:", err);
    showToast("Failed to register customer profile.", "error");
  }
}


// --- Reusable Custom Premium Dialog Modals (Alert/Confirm/Prompt) ---
function showCustomConfirm(title, message, isWarning = false) {
  return new Promise((resolve) => {
    dialogTitle.innerHTML = `<i class="fa-solid ${isWarning ? 'fa-triangle-exclamation' : 'fa-circle-question'}" style="color: ${isWarning ? 'var(--danger-color)' : 'var(--primary-color)'};"></i> ${title}`;
    dialogMessage.innerText = message;
    dialogInputWrapper.style.display = 'none';
    dialogCancelBtn.style.display = 'block';

    if (isWarning) {
      dialogConfirmBtn.className = 'dialog-btn warning';
    } else {
      dialogConfirmBtn.className = 'dialog-btn confirm';
    }

    customDialogModal.style.display = 'block';
    modalOverlay.classList.add('open');
    customDialogModal.getBoundingClientRect();
    customDialogModal.classList.add('open');

    function onConfirm() {
      cleanup();
      resolve(true);
    }

    function onCancel() {
      cleanup();
      resolve(false);
    }

    function cleanup() {
      dialogConfirmBtn.removeEventListener('click', onConfirm);
      dialogCancelBtn.removeEventListener('click', onCancel);
      customDialogModal.classList.remove('open');
      setTimeout(() => {
        customDialogModal.style.display = 'none';
        if (!cartSidebar.classList.contains('open') && !loginModal.classList.contains('open') && !paymentGatewayModal.classList.contains('open') && !bargainModal.classList.contains('open')) {
          modalOverlay.classList.remove('open');
        }
      }, 300);
    }

    dialogConfirmBtn.addEventListener('click', onConfirm);
    dialogCancelBtn.addEventListener('click', onCancel);
  });
}

function showCustomPrompt(title, message, defaultValue = '') {
  return new Promise((resolve) => {
    dialogTitle.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: var(--primary-color);"></i> ${title}`;
    dialogMessage.innerText = message;
    dialogInputWrapper.style.display = 'block';
    dialogInput.value = defaultValue;
    dialogCancelBtn.style.display = 'block';
    dialogConfirmBtn.className = 'dialog-btn confirm';

    customDialogModal.style.display = 'block';
    modalOverlay.classList.add('open');
    customDialogModal.getBoundingClientRect();
    customDialogModal.classList.add('open');
    dialogInput.focus();

    function onConfirm() {
      const val = dialogInput.value.trim();
      cleanup();
      resolve(val);
    }

    function onCancel() {
      cleanup();
      resolve(null);
    }

    function cleanup() {
      dialogConfirmBtn.removeEventListener('click', onConfirm);
      dialogCancelBtn.removeEventListener('click', onCancel);
      customDialogModal.classList.remove('open');
      setTimeout(() => {
        customDialogModal.style.display = 'none';
        if (!cartSidebar.classList.contains('open') && !loginModal.classList.contains('open') && !paymentGatewayModal.classList.contains('open') && !bargainModal.classList.contains('open')) {
          modalOverlay.classList.remove('open');
        }
      }, 300);
    }

    dialogConfirmBtn.addEventListener('click', onConfirm);
    dialogCancelBtn.addEventListener('click', onCancel);
  });
}

function showCustomAlert(title, message) {
  return new Promise((resolve) => {
    dialogTitle.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--primary-color);"></i> ${title}`;
    dialogMessage.innerText = message;
    dialogInputWrapper.style.display = 'none';
    dialogCancelBtn.style.display = 'none';
    dialogConfirmBtn.className = 'dialog-btn confirm';

    customDialogModal.style.display = 'block';
    modalOverlay.classList.add('open');
    customDialogModal.getBoundingClientRect();
    customDialogModal.classList.add('open');

    function onConfirm() {
      cleanup();
      resolve();
    }

    function cleanup() {
      dialogConfirmBtn.removeEventListener('click', onConfirm);
      customDialogModal.classList.remove('open');
      setTimeout(() => {
        customDialogModal.style.display = 'none';
        if (!cartSidebar.classList.contains('open') && !loginModal.classList.contains('open') && !paymentGatewayModal.classList.contains('open') && !bargainModal.classList.contains('open')) {
          modalOverlay.classList.remove('open');
        }
      }, 300);
    }

    dialogConfirmBtn.addEventListener('click', onConfirm);
  });
}

// --- Custom Toast Alert System ---
function showToast(message, type = "success") {
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '<i class="fa-solid fa-circle-check" style="color: var(--accent-color);"></i>';
  if (type === 'error') {
    toast.style.borderLeftColor = 'var(--danger-color)';
    icon = '<i class="fa-solid fa-circle-xmark" style="color: var(--danger-color);"></i>';
  } else if (type === 'warning') {
    toast.style.borderLeftColor = 'var(--warning-color)';
    icon = '<i class="fa-solid fa-circle-exclamation" style="color: var(--warning-color);"></i>';
  } else if (type === 'info') {
    toast.style.borderLeftColor = '#3182ce';
    icon = '<i class="fa-solid fa-circle-info" style="color: #3182ce;"></i>';
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

// ==========================================================================
// AUTHENTICATION & LOGIN FLOW HELPERS
// ==========================================================================
function initAuthUI() {
  if (currentUserRole === 'seller' && currentSellerId) {
    loginHeaderBtn.style.display = "none";
    userProfileBadge.style.display = "flex";
    const seller = sellers[currentSellerId];
    userPhoneDisplay.innerText = seller ? `Seller: ${seller.name}` : `Seller Panel`;
  } else if (currentUserPhone) {
    loginHeaderBtn.style.display = "none";
    userProfileBadge.style.display = "flex";
    const name = localStorage.getItem('currentUserName');
    userPhoneDisplay.innerText = name ? name : currentUserPhone;
  } else {
    loginHeaderBtn.style.display = "flex";
    userProfileBadge.style.display = "none";
  }
}

function openLoginModal() {
  loginModal.classList.add('open');
  modalOverlay.classList.add('open');
  // Reset steps
  loginStepMobile.style.display = "flex";
  loginStepOtp.style.display = "none";
  document.getElementById('loginStepSellerRegister').style.display = "none";
  document.getElementById('loginStepCustomerRegister').style.display = "none";
  loginMobile.value = '';
  switchLoginTab('customer');
  setTimeout(() => loginMobile.focus(), 150);
}

function switchLoginTab(role) {
  loginRole = role;
  const tabCustomer = document.getElementById('loginTabCustomer');
  const tabSeller = document.getElementById('loginTabSeller');
  const title = document.getElementById('loginStepMobileTitle');
  const desc = document.getElementById('loginStepMobileDesc');

  if (role === 'customer') {
    tabCustomer.classList.add('active');
    tabSeller.classList.remove('active');
    tabCustomer.style.color = 'var(--primary-color)';
    tabCustomer.style.borderBottomColor = 'var(--primary-color)';
    tabSeller.style.color = 'var(--text-secondary)';
    tabSeller.style.borderBottomColor = 'transparent';
    title.innerText = "Customer Sign In";
    desc.innerText = "Enter your 10-digit mobile number to access direct seller contact and discounts.";
  } else {
    tabCustomer.classList.remove('active');
    tabSeller.classList.add('active');
    tabSeller.style.color = 'var(--primary-color)';
    tabSeller.style.borderBottomColor = 'var(--primary-color)';
    tabCustomer.style.color = 'var(--text-secondary)';
    tabCustomer.style.borderBottomColor = 'transparent';
    title.innerText = "Seller Sign In";
    desc.innerText = "Enter your registered vendor mobile number to manage your organic store yields.";
  }
}

function closeLoginModal() {
  loginModal.classList.remove('open');
  if (!cartSidebar.classList.contains('open') && !paymentGatewayModal.classList.contains('open')) {
    modalOverlay.classList.remove('open');
  }
  if (otpTimerInterval) clearInterval(otpTimerInterval);
}

async function handleLogout() {
  if (await showCustomConfirm("Logout Confirmation", "Are you sure you want to logout?")) {
    currentUserPhone = null;
    currentUserRole = 'customer';
    currentSellerId = null;
    currentUserCoordinates = null;
    localStorage.removeItem('currentUserPhone');
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('currentSellerId');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserAddress');
    localStorage.removeItem('currentUserPincode');
    localStorage.removeItem('currentUserCoordinates');
    initAuthUI();
    switchRole('customer');
    showToast("Logged out successfully", "info");
  }
}

async function handleDeleteAccount() {
  if (!await showCustomConfirm("Delete Account", "Are you sure you want to permanently delete your account? This action cannot be undone.", true)) {
    return;
  }

  showToast("Deleting account...", "info");

  try {
    let success = false;
    if (currentUserRole === 'seller') {
      const res = await fetch('/api/sellers/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sellerId: currentSellerId })
      });
      const data = await res.json();
      success = data.success;
    } else {
      const res = await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentUserPhone })
      });
      const data = await res.json();
      success = data.success;
    }

    if (success) {
      currentUserPhone = null;
      currentUserRole = 'customer';
      currentSellerId = null;
      currentUserCoordinates = null;
      localStorage.removeItem('currentUserPhone');
      localStorage.removeItem('currentUserRole');
      localStorage.removeItem('currentSellerId');
      localStorage.removeItem('currentUserName');
      localStorage.removeItem('currentUserEmail');
      localStorage.removeItem('currentUserAddress');
      localStorage.removeItem('currentUserPincode');
      localStorage.removeItem('currentUserCoordinates');
      
      initAuthUI();
      switchRole('customer');
      showToast("Your account has been deleted successfully.", "success");
      
      // Reload sellers & products dynamically
      await loadSellersAndProducts();
      renderProducts();
    } else {
      showToast("Failed to delete account.", "error");
    }
  } catch (err) {
    console.error("Delete account error:", err);
    showToast("Failed to delete account.", "error");
  }
}

// Simulated OTP SMS Toast Popup (displays at left corner)
function showSmsOtpPopup(phone, otp) {
  const popup = document.getElementById('smsOtpPopup');
  if (!popup) return;

  popup.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem; margin-bottom: 0.4rem;">
      <span style="font-weight: 700; color: var(--primary-color); font-size: 0.9rem; display: flex; align-items: center; gap: 0.4rem;">
        <i class="fa-solid fa-message"></i> SMS Messages
      </span>
      <button onclick="document.getElementById('smsOtpPopup').style.display='none'" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-secondary); line-height: 1;">&times;</button>
    </div>
    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.2rem;">From: <strong>VeggieDirect SIM Gateway</strong></div>
    <div style="font-size: 0.95rem; font-weight: 600; color: var(--primary-dark); line-height: 1.4;">
      Your VeggieDirect verification code is: <span style="font-weight: 800; color: #ff8f00; font-size: 1.1rem; border-bottom: 2px dashed #ff8f00; padding: 0 4px;">${otp}</span>
    </div>
  `;

  popup.style.display = 'flex';
}

function handleSendOtp() {
  const phone = loginMobile.value.trim();
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    showToast("Please enter a valid 10-digit mobile number!", "error");
    return;
  }

  tempMobile = phone;
  showToast("Requesting OTP...", "info");

  fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: phone })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      generatedOtp = null; // Verification will happen on server
      showCustomAlert("SMS Verification Code Sent", `A real SMS verification code has been sent successfully to your mobile number +91 ${phone} via Twilio!`);

      sentMobileDisplay.innerText = `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
      loginStepMobile.style.display = "none";
      loginStepOtp.style.display = "flex";

      // Clear previous OTP inputs
      otpInputFields.forEach(field => field.value = '');
      setTimeout(() => otpInputFields[0].focus(), 150);

      // Start timer countdown
      if (otpTimerInterval) clearInterval(otpTimerInterval);
      let timeLeft = 30;
      resendOtpBtn.style.display = "none";
      otpTimer.style.display = "inline";
      otpTimer.innerText = `Resend in ${timeLeft}s`;

      otpTimerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(otpTimerInterval);
          otpTimer.style.display = "none";
          resendOtpBtn.style.display = "inline";
        } else {
          otpTimer.innerText = `Resend in ${timeLeft}s`;
        }
      }, 1000);
    } else {
      // Fallback to local simulation if Twilio API fails
      generatedOtp = Math.floor(100000 + Math.random() * 900000);
      showToast("Twilio Offline: Using Local Simulation Gateway", "warning");
      showSmsOtpPopup(phone, generatedOtp);
      
      sentMobileDisplay.innerText = `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
      loginStepMobile.style.display = "none";
      loginStepOtp.style.display = "flex";

      // Clear previous OTP inputs
      otpInputFields.forEach(field => field.value = '');
      setTimeout(() => otpInputFields[0].focus(), 150);

      // Start timer countdown
      if (otpTimerInterval) clearInterval(otpTimerInterval);
      let timeLeft = 30;
      resendOtpBtn.style.display = "none";
      otpTimer.style.display = "inline";
      otpTimer.innerText = `Resend in ${timeLeft}s`;

      otpTimerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(otpTimerInterval);
          otpTimer.style.display = "none";
          resendOtpBtn.style.display = "inline";
        } else {
          otpTimer.innerText = `Resend in ${timeLeft}s`;
        }
      }, 1000);
    }
  })
  .catch(err => {
    console.error("SMS API Error, falling back to simulation:", err);
    generatedOtp = Math.floor(100000 + Math.random() * 900000);
    showToast("Twilio Offline: Using Local Simulation Gateway", "warning");
    showSmsOtpPopup(phone, generatedOtp);
    
    sentMobileDisplay.innerText = `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
    loginStepMobile.style.display = "none";
    loginStepOtp.style.display = "flex";

    // Clear previous OTP inputs
    otpInputFields.forEach(field => field.value = '');
    setTimeout(() => otpInputFields[0].focus(), 150);

    // Start timer countdown
    if (otpTimerInterval) clearInterval(otpTimerInterval);
    let timeLeft = 30;
    resendOtpBtn.style.display = "none";
    otpTimer.style.display = "inline";
    otpTimer.innerText = `Resend in ${timeLeft}s`;

    otpTimerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(otpTimerInterval);
        otpTimer.style.display = "none";
        resendOtpBtn.style.display = "inline";
      } else {
        otpTimer.innerText = `Resend in ${timeLeft}s`;
      }
    }, 1000);
  });
}

function handleVerifyOtp() {
  let enteredOtp = '';
  otpInputFields.forEach(field => enteredOtp += field.value);

  if (enteredOtp.length < 6) {
    showToast("Please enter the complete 6-digit verification code!", "warning");
    return;
  }

  if (generatedOtp !== null) {
    if (parseInt(enteredOtp) === generatedOtp) {
      const fullPhone = tempMobile.startsWith('+') ? tempMobile : '+91' + tempMobile;
      showToast("Fetching profile...", "info");
      fetch(`/api/users/by-phone?phone=${encodeURIComponent(fullPhone)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          processOtpSuccess(data.user);
        } else {
          processOtpSuccess(null);
        }
      })
      .catch(err => {
        console.error("Error fetching user profile:", err);
        processOtpSuccess(null);
      });
    } else {
      showToast("Incorrect simulated OTP code entered!", "error");
    }
  } else {
    showToast("Verifying code...", "info");
    fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: tempMobile, otp: enteredOtp })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        processOtpSuccess(data.user);
      } else {
        showToast(data.error || "Invalid OTP verification code.", "error");
      }
    })
    .catch(err => {
      console.error("Verification error:", err);
      showToast("Failed to verify code due to server connection error.", "error");
    });
  }
}

function processOtpSuccess(userData) {
  if (loginRole === 'seller') {
    const cleanTempPhone = tempMobile.replace(/[^0-9]/g, '');
    const existingSeller = Object.values(sellers).find(s => s.phone.replace(/[^0-9]/g, '').endsWith(cleanTempPhone));
    
    if (existingSeller) {
      currentUserRole = 'seller';
      currentSellerId = existingSeller.id;
      currentUserPhone = existingSeller.phone;
      
      localStorage.setItem('currentUserRole', currentUserRole);
      localStorage.setItem('currentSellerId', currentSellerId);
      localStorage.setItem('currentUserPhone', currentUserPhone);
      
      initAuthUI();
      closeLoginModal();
      showToast(`Welcome back, ${existingSeller.name}!`, "success");
      switchRole('seller');
    } else {
      // Go to registration step
      loginStepOtp.style.display = "none";
      document.getElementById('loginStepSellerRegister').style.display = "flex";
      document.getElementById('registerFarmName').value = '';
      document.getElementById('registerFarmEmail').value = '';
      setTimeout(() => document.getElementById('registerFarmName').focus(), 150);
    }
  } else {
    // Customer login
    if (userData && userData.name) {
      // User is already registered
      currentUserRole = 'customer';
      currentUserPhone = userData.phone;
      currentSellerId = null;

      if (userData.coordinates) {
        currentUserCoordinates = userData.coordinates;
      } else if (userData.pincode) {
        currentUserCoordinates = getCoordinatesFromPincode(userData.pincode);
      } else {
        currentUserCoordinates = { lat: 18.9482, lng: 72.8258 };
      }
      
      localStorage.setItem('currentUserRole', currentUserRole);
      localStorage.setItem('currentUserPhone', currentUserPhone);
      localStorage.setItem('currentUserName', userData.name || '');
      localStorage.setItem('currentUserEmail', userData.email || '');
      localStorage.setItem('currentUserAddress', userData.address || '');
      localStorage.setItem('currentUserPincode', userData.pincode || '');
      localStorage.setItem('currentUserCoordinates', JSON.stringify(currentUserCoordinates));
      localStorage.removeItem('currentSellerId');
      
      initAuthUI();
      closeLoginModal();
      showToast(`Welcome back, ${userData.name}!`, "success");
      switchRole('customer');
    } else {
      // New user, go to customer registration step
      loginStepOtp.style.display = "none";
      document.getElementById('loginStepCustomerRegister').style.display = "flex";
      document.getElementById('registerCustName').value = '';
      document.getElementById('registerCustEmail').value = '';
      document.getElementById('registerCustAddress').value = '';
      document.getElementById('registerCustPincode').value = '';
      document.getElementById('registerCustLat').value = '';
      document.getElementById('registerCustLng').value = '';
      setTimeout(() => document.getElementById('registerCustName').focus(), 150);
    }
  }
}

async function handleRegisterSellerSubmit() {
  const farmName = document.getElementById('registerFarmName').value.trim();
  const farmEmail = document.getElementById('registerFarmEmail').value.trim();
  const farmLat = parseFloat(document.getElementById('registerFarmLat').value);
  const farmLng = parseFloat(document.getElementById('registerFarmLng').value);

  if (!farmName) {
    showToast("Please enter a Farm or Store name!", "error");
    return;
  }

  let coords = null;
  if (!isNaN(farmLat) && !isNaN(farmLng)) {
    coords = { lat: farmLat, lng: farmLng };
  } else {
    coords = { lat: 18.9482, lng: 72.8258 };
  }

  showToast("Registering your farm store...", "info");

  try {
    const res = await fetch('/api/sellers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: farmName,
        phone: tempMobile,
        email: farmEmail,
        coordinates: coords
      })
    });
    const data = await res.json();
    if (data.success) {
      const newSeller = data.seller;
      
      // Reload catalog to update local state
      await loadSellersAndProducts();

      currentUserRole = 'seller';
      currentSellerId = newSeller.id;
      currentUserPhone = newSeller.phone;
      
      localStorage.setItem('currentUserRole', currentUserRole);
      localStorage.setItem('currentSellerId', currentSellerId);
      localStorage.setItem('currentUserPhone', currentUserPhone);
      
      initAuthUI();
      closeLoginModal();
      showToast(`Welcome to VeggieDirect, ${newSeller.name}!`, "success");
      switchRole('seller');
    } else {
      showToast(data.error || "Failed to register seller.", "error");
    }
  } catch (err) {
    console.error("Seller registration error:", err);
    showToast("Failed to register seller.", "error");
  }
}

async function renderSellerOrders() {
  const tbody = document.getElementById('sellerOrdersTable');
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 2rem;">
        <i class="fa-solid fa-spinner fa-spin"></i> Loading incoming orders...
      </td>
    </tr>
  `;

  try {
    const res = await fetch(`/api/orders?sellerId=${currentSellerId}`);
    const data = await res.json();
    if (data.success) {
      const sellerOrders = data.orders || [];
      if (sellerOrders.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 2rem;">
              No incoming orders yet.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = '';
      sellerOrders.forEach(order => {
        const tr = document.createElement('tr');
        const sellerItems = order.items;

        const itemsHtml = sellerItems.map(item => {
          const prod = products.find(p => p.id === item.productId);
          const name = prod ? prod.name : `Product #${item.productId}`;
          return `<div style="font-weight:600;">${name} (${item.quantity} ${prod ? prod.unit : 'unit'})</div>`;
        }).join('');

        let statusBadge = '';
        if (order.status === 'pending') {
          statusBadge = `<span class="stock-tag low-stock" style="background:#fff3e0; color:#e65100;">Pending</span>`;
        } else if (order.status === 'accepted') {
          statusBadge = `<span class="stock-tag in-stock" style="background:#e8f5e9; color:#1b5e20;">Accepted (Delivery Ready)</span>`;
        } else {
          statusBadge = `<span class="stock-tag in-stock">${order.status}</span>`;
        }

        let actionBtnHtml = '';
        if (order.status === 'pending') {
          actionBtnHtml = `
            <button class="form-btn" onclick="acceptOrder(${order.id})" style="background:var(--accent-light); border-color:var(--accent-color); color:var(--primary-dark); font-weight:700; width:auto; padding:0.4rem 0.8rem; display:flex; align-items:center; gap:0.3rem;" title="Accept Order">
              <i class="fa-solid fa-check"></i> Accept
            </button>
          `;
        } else {
          actionBtnHtml = `<span style="font-size:0.85rem; color:var(--text-secondary); font-weight: 700;"><i class="fa-solid fa-circle-check" style="color:var(--accent-color);"></i> Accepted</span>`;
        }

        const orderDate = new Date(order.orderedAt);
        const timeText = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        tr.innerHTML = `
          <td>
            <div style="font-weight: 700; color:var(--primary-dark);">#ORD-${order.id}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary);">${timeText}</div>
          </td>
          <td>
            <div style="font-weight: 600;">${order.phone}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); max-width: 200px; word-wrap: break-word; margin-top: 0.2rem;" title="${order.address || 'No address provided'}">
              <i class="fa-solid fa-location-dot" style="color: var(--accent-color); font-size: 0.75rem;"></i> ${order.address || 'N/A'}
            </div>
          </td>
          <td>${itemsHtml}</td>
          <td style="font-weight: 800; color:var(--primary-color);">₹${order.total}</td>
          <td>${statusBadge}</td>
          <td>${actionBtnHtml}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error loading seller orders:", err);
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--danger-color); padding: 2rem;">
          Failed to load orders from database.
        </td>
      </tr>
    `;
  }
}

async function acceptOrder(orderId) {
  if (!await showCustomConfirm("Accept Order", `Are you sure you want to accept Order #ORD-${orderId}? Our team will proceed to the next step of delivery.`)) return;

  showToast("Accepting order...", "info");
  try {
    const res = await fetch('/api/orders/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: orderId, status: 'accepted' })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Order #ORD-${orderId} Accepted! Delivery team notified.`, "success");
      await renderSellerOrders();
    } else {
      showToast(data.error || "Failed to accept order.", "error");
    }
  } catch (err) {
    console.error("Error accepting order:", err);
    showToast("Failed to accept order.", "error");
  }
}

// ==========================================================================
// PAYMENT METHOD & GATEWAY HELPERS
// ==========================================================================
function switchPaymentMethod(method) {
  selectedPaymentMethod = method;
  if (method === 'cod') {
    payMethodCod.classList.add('active');
    payMethodOnline.classList.remove('active');
    checkoutBtn.innerText = "Proceed to Checkout";
  } else {
    payMethodCod.classList.remove('active');
    payMethodOnline.classList.add('active');
    checkoutBtn.innerText = "Pay & Place Order";
  }
}

function openPaymentGateway(amount) {
  gatewayAmount.innerText = amount;
  upiIdInput.value = '';
  paymentGatewayModal.classList.add('open');
  modalOverlay.classList.add('open');
}

function closePaymentGateway() {
  paymentGatewayModal.classList.remove('open');
  if (!cartSidebar.classList.contains('open') && !loginModal.classList.contains('open')) {
    modalOverlay.classList.remove('open');
  }
}

function handleOnlinePaymentSubmit() {
  showToast("Connecting to secure bank gateway...", "info");
  submitPaymentBtn.disabled = true;
  submitPaymentBtn.innerText = "Processing Payment...";

  setTimeout(() => {
    submitPaymentBtn.disabled = false;
    submitPaymentBtn.innerText = "Authorize Payment";
    closePaymentGateway();
    finalizeCheckout("Online Payment (UPI/Card)");
  }, 2000);
}

// ==========================================================================
// PRICE NEGOTIATION & BARGAINING HELPERS
// ==========================================================================
function openBargainModal(productId) {
  // Auth Gate check
  if (!currentUserPhone) {
    showToast("Please login first to bargain with local farmers!", "warning");
    openLoginModal();
    return;
  }

  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  activeBargainProductId = productId;
  const seller = sellers[prod.sellerId];

  // Set min offer price to 75% of list price, max to 100%
  const minOffer = Math.round(prod.price * 0.75);
  const maxOffer = prod.price;

  // Set slider values
  bargainSlider.min = minOffer;
  bargainSlider.max = maxOffer;
  bargainSlider.value = Math.round((minOffer + maxOffer) / 2);

  // Update UI values
  bargainProdImg.src = IMAGE_MAP[prod.imageKey] || IMAGE_MAP.tomato;
  bargainProdImg.onerror = function() {
    this.onerror = null;
    this.src = getFallbackSvg(prod.imageKey);
  };
  bargainProdTitle.innerText = prod.name;
  bargainSellerName.innerText = seller.name;
  bargainOriginalPrice.innerText = `₹${prod.price}`;
  bargainOfferVal.innerText = `₹${bargainSlider.value}`;
  bargainMinBound.innerText = `₹${minOffer}`;
  bargainMaxBound.innerText = `₹${maxOffer}`;

  // Reset dialog box and action buttons
  bargainDialogueText.innerText = `"${seller.name} here! I harvested this veggie fresh this morning. What price are you offering?"`;
  bargainActionRow.style.display = "grid";
  bargainCounterRow.style.display = "none";

  // Open modal
  bargainModal.classList.add('open');
  modalOverlay.classList.add('open');
}

function closeBargainModal() {
  bargainModal.classList.remove('open');
  if (!cartSidebar.classList.contains('open') && !loginModal.classList.contains('open') && !paymentGatewayModal.classList.contains('open')) {
    modalOverlay.classList.remove('open');
  }
  activeBargainProductId = null;
}

function handleBargainSliderChange() {
  bargainOfferVal.innerText = `₹${bargainSlider.value}`;
}

function handleBargainOfferSubmit() {
  const offer = parseInt(bargainSlider.value);
  const prod = products.find(p => p.id === activeBargainProductId);
  const seller = sellers[prod.sellerId];

  bargainDialogueText.innerText = `"... reviewing your offer price"`;
  submitBargainBtn.disabled = true;

  setTimeout(() => {
    submitBargainBtn.disabled = false;
    
    // Bargaining Logic Rules
    if (offer >= Math.round(prod.price * 0.90)) {
      // Direct Accept!
      bargainDialogueText.innerText = `"${seller.name}: Deal! I accept ₹${offer} per unit for this batch. Adding to basket."`;
      negotiatedPrices[activeBargainProductId] = offer;
      
      // Add to cart automatically
      addToCart(activeBargainProductId);

      setTimeout(() => {
        closeBargainModal();
        renderProducts();
      }, 1500);

    } else {
      // Counter-Offer Loop
      bargainCounterPrice = Math.round((offer + prod.price) / 2);
      
      bargainDialogueText.innerText = `"${seller.name}: ₹${offer} is a bit too low for organic yields. Can we split the difference and settle on ₹${bargainCounterPrice}?"`;
      
      bargainActionRow.style.display = "none";
      bargainCounterRow.style.display = "grid";
    }
  }, 1200);
}

function acceptBargainCounter() {
  bargainDialogueText.innerText = `"Deal accepted! Appending custom price to order..."`;
  negotiatedPrices[activeBargainProductId] = bargainCounterPrice;

  // Add to cart
  addToCart(activeBargainProductId);

  setTimeout(() => {
    closeBargainModal();
    renderProducts();
  }, 1200);
}

function rejectBargainCounter() {
  const prod = products.find(p => p.id === activeBargainProductId);
  const seller = sellers[prod.sellerId];
  
  bargainDialogueText.innerText = `"${seller.name}: Sincere apologies, I cannot sell organic yields below that threshold. Let me know if you change your mind!"`;

  setTimeout(() => {
    closeBargainModal();
  }, 1500);
}

// ==========================================================================
// FARM HARVEST & FRESHNESS TRACKER HELPERS
// ==========================================================================
function calculateFreshness() {
  const now = Date.now();
  products.forEach(p => {
    // Generate static morning harvest timestamps for products
    if (!p.harvestTime) {
      const hoursAgo = 2 + (p.id * 1.5) % 10;
      p.harvestTime = now - (hoursAgo * 60 * 60 * 1000);
    }
    
    const elapsedMs = now - p.harvestTime;
    const elapsedHours = elapsedMs / (1000 * 60 * 60);
    
    // Freshness decays 4.5% per hour, starting at 100%, bottoming at 30%
    p.freshnessPct = Math.max(30, Math.round(100 - (elapsedHours * 4.5)));
    
    if (elapsedHours < 1) {
      p.harvestTimeText = `${Math.round(elapsedHours * 60)} mins`;
    } else {
      p.harvestTimeText = `${elapsedHours.toFixed(1)} hrs`;
    }
  });
}
