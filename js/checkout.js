/* ==========================================================================
   GREENSPROUT PURE FRONTEND CHECKOUT & STRIPE SIMULATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  setupCheckoutFormHandler();
  setupStripeMockUI();
});

// Render Order Summary in Checkout Page Sidebar
function renderCheckoutSummary() {
  const summaryItems = document.getElementById('checkoutSummaryItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const shippingEl = document.getElementById('checkoutShipping');
  const grandTotalEl = document.getElementById('checkoutGrandTotal');

  if (!summaryItems) return;

  const cart = typeof getCart === 'function' ? getCart() : [];
  
  if (cart.length === 0) {
    summaryItems.innerHTML = `
      <div class="empty-summary" style="text-align: center; padding: 20px;">
        <p style="color: var(--text-muted); margin-bottom: 12px;">Your shopping cart is currently empty.</p>
        <a href="shop.html" class="green-button" style="padding: 8px 18px; font-size: 0.9rem;">Browse Catalog</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'LKR 0';
    if (shippingEl) shippingEl.textContent = 'LKR 0';
    if (grandTotalEl) grandTotalEl.textContent = 'LKR 0';
    return;
  }

  let subtotal = 0;
  let html = '';

  cart.forEach(item => {
    const product = typeof getProductById === 'function' ? getProductById(item.id) : null;
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;

    html += `
      <div class="summary-item-card" style="display: flex; gap: 12px; margin-bottom: 12px; align-items: center;">
        <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius-sm); background: var(--bg-sage);">
        <div style="flex: 1;">
          <h4 style="font-size: 0.95rem; margin-bottom: 2px;">${product.name}</h4>
          <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; justify-content: space-between;">
            <span>Qty: ${item.quantity}</span>
            <strong style="color: var(--primary);">${formatPrice(itemTotal)}</strong>
          </div>
        </div>
      </div>
    `;
  });

  summaryItems.innerHTML = html;

  // Free shipping over LKR 3,000, else flat LKR 350
  const shipping = subtotal > 3000 ? 0 : 350;
  const grandTotal = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE Shipping 🌱' : formatPrice(shipping);
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(grandTotal);
}

// Setup Form Submission & Pure Frontend Payment Simulation
function setupCheckoutFormHandler() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = typeof getCart === 'function' ? getCart() : [];
    if (cart.length === 0) {
      if (typeof showToast === 'function') showToast('Your shopping cart is empty!', 'warning');
      return;
    }

    // Customer Form Inputs
    const customer = {
      name: document.getElementById('name')?.value || 'Customer',
      email: document.getElementById('email')?.value || 'customer@example.com',
      phone: document.getElementById('phone')?.value || '+94 77 123 4567',
      address: document.getElementById('address')?.value || 'Colombo',
      city: document.getElementById('city')?.value || 'Colombo',
      postalCode: document.getElementById('postalCode')?.value || '00100',
      country: document.getElementById('country')?.value || 'Sri Lanka'
    };

    const paymentMethodEl = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'Stripe';

    // Mock validation for Stripe fields
    if (paymentMethod === 'Stripe') {
      const cardNumber = document.getElementById('mockCardNumber')?.value.replace(/\s+/g, '');
      const expiry = document.getElementById('mockCardExpiry')?.value;
      const cvc = document.getElementById('mockCardCVC')?.value;

      if (!cardNumber || cardNumber.length < 15) {
        if (typeof showToast === 'function') showToast('Please enter a valid card number.', 'warning');
        return;
      }
      if (!expiry || !expiry.includes('/')) {
        if (typeof showToast === 'function') showToast('Please enter a valid expiration date (MM/YY).', 'warning');
        return;
      }
      if (!cvc || cvc.length < 3) {
        if (typeof showToast === 'function') showToast('Please enter a valid CVC.', 'warning');
        return;
      }
    }

    // Store order details in LocalStorage
    localStorage.setItem('greenSproutCustomer', JSON.stringify(customer));
    localStorage.setItem('greenSproutPayment', paymentMethod);

    const submitBtn = document.getElementById('checkoutSubmitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `🔒 Authorizing Secure Payment...`;
    }

    if (typeof showToast === 'function') {
      showToast('Processing secure order payment...', 'info');
    }

    // Generate unique order ID
    const orderId = 'GS-' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('greenSproutLastOrderId', orderId);

    // Redirect smoothly to confirmation page after short simulation delay
    setTimeout(() => {
      window.location.href = `order-confirmation.html?order_id=${orderId}&method=${paymentMethod.toLowerCase()}`;
    }, 1000);
  });
}

// Setup Mock Stripe UI Toggle & Input Formatting
function setupStripeMockUI() {
  const stripeRadio = document.querySelector('input[name="paymentMethod"][value="Stripe"]');
  const codRadio = document.querySelector('input[name="paymentMethod"][value="COD"]');
  const mockContainer = document.getElementById('stripeMockContainer');
  const paymentOptionStripe = stripeRadio?.closest('.payment-option');

  if (!stripeRadio || !codRadio || !mockContainer) return;

  const toggleMockUI = () => {
    if (stripeRadio.checked) {
      mockContainer.classList.remove('hidden');
      if (paymentOptionStripe) {
        paymentOptionStripe.style.borderBottomLeftRadius = '0';
        paymentOptionStripe.style.borderBottomRightRadius = '0';
      }
    } else {
      mockContainer.classList.add('hidden');
      if (paymentOptionStripe) {
        paymentOptionStripe.style.borderBottomLeftRadius = 'var(--radius-md)';
        paymentOptionStripe.style.borderBottomRightRadius = 'var(--radius-md)';
      }
    }
  };

  stripeRadio.addEventListener('change', toggleMockUI);
  codRadio.addEventListener('change', toggleMockUI);

  // Formatting inputs
  const cardNumberInput = document.getElementById('mockCardNumber');
  const cardExpiryInput = document.getElementById('mockCardExpiry');
  const cardCVCInput = document.getElementById('mockCardCVC');

  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      let formatted = '';
      for (let i = 0; i < val.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += val[i];
      }
      e.target.value = formatted.substring(0, 19);
    });
  }

  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
      }
      e.target.value = val;
    });
  }

  if (cardCVCInput) {
    cardCVCInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }
}
