/* ==========================================================================
   GREENSPROUT SHOPPING CART & WISHLIST LOGIC
   ========================================================================== */

const CART_STORAGE_KEY = "greensproutCart";
const WISHLIST_STORAGE_KEY = "greensproutWishlist";

// Retrieve Cart array from LocalStorage
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
    return [];
  }
}

// Save Cart array to LocalStorage and refresh UI badges
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
}

// Calculate total item count in cart
function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

// Update all cart count badges in header navigation
function updateCartBadges() {
  const count = getCartCount();
  const badges = document.querySelectorAll('.cart-count, #cartBadgeCount');
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.add('has-items');
      badge.style.display = 'inline-flex';
    } else {
      badge.classList.remove('has-items');
    }
  });
}

// Add Product to Cart with stock validation
function addToCart(productId, qtyToAdd = 1) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  
  if (!product) {
    showToast("Product not found!", "error");
    return false;
  }

  // Stock check
  if (product.stock <= 0) {
    showToast(`Sorry, ${product.name} is currently out of stock.`, "warning");
    return false;
  }

  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === Number(productId));
  const currentQtyInCart = existingIndex > -1 ? cart[existingIndex].quantity : 0;
  const requestedTotalQty = currentQtyInCart + qtyToAdd;

  if (requestedTotalQty > product.stock) {
    showToast(`Only ${product.stock} units available in stock. You already have ${currentQtyInCart} in cart.`, "warning");
    return false;
  }

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qtyToAdd;
  } else {
    cart.push({
      id: Number(productId),
      quantity: qtyToAdd,
      addedAt: new Date().toISOString()
    });
  }

  saveCart(cart);
  showToast(`Added ${qtyToAdd}x "${product.name}" to cart! 🛒`, "success");

  // Re-render cart if on cart.html page
  if (typeof displayCart === 'function') {
    displayCart();
  }

  return true;
}

// Change Quantity in Cart
function changeQuantity(productId, delta) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === Number(productId));
  
  if (index === -1) return;

  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  const newQty = cart[index].quantity + delta;

  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  if (product && newQty > product.stock) {
    showToast(`Stock limit reached! Only ${product.stock} available.`, "warning");
    return;
  }

  cart[index].quantity = newQty;
  saveCart(cart);

  if (typeof displayCart === 'function') {
    displayCart();
  }
}

// Remove item from Cart
function removeFromCart(productId) {
  let cart = getCart();
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  
  cart = cart.filter(item => item.id !== Number(productId));
  saveCart(cart);
  
  const name = product ? product.name : "Item";
  showToast(`Removed "${name}" from cart.`, "info");

  if (typeof displayCart === 'function') {
    displayCart();
  }
}

// Clear entire cart
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadges();
  if (typeof displayCart === 'function') {
    displayCart();
  }
}

/* ==========================================================================
   WISHLIST LOGIC
   ========================================================================== */

function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const idNum = Number(productId);
  const index = wishlist.indexOf(idNum);
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  const productName = product ? product.name : "Product";

  if (index > -1) {
    wishlist.splice(index, 1);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    showToast(`Removed "${productName}" from your wishlist.`, "info");
  } else {
    wishlist.push(idNum);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    showToast(`Saved "${productName}" to your wishlist! 💚`, "success");
  }

  // Update UI icons if elements exist
  const buttons = document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`);
  buttons.forEach(btn => {
    const isSaved = wishlist.includes(idNum);
    btn.classList.toggle('active', isSaved);
    btn.setAttribute('aria-pressed', String(isSaved));
    btn.setAttribute('aria-label', isSaved ? 'Remove from favourites' : 'Add to favourites');
  });
}

function isWishlisted(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(Number(productId));
}

/* ==========================================================================
   TOAST NOTIFICATION UTILITY
   ========================================================================== */

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '❌';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;

  container.appendChild(toast);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Auto-run on script load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
});
