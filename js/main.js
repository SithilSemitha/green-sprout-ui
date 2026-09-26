/* ==========================================================================
   GREENSPROUT GLOBAL MAIN UI & MICRO-INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initNewsletterForm();
  initBackToTop();
  initFavoritesNavigation();
  highlightActiveNavLink();
  initChatWidget();
  initSplashScreen();
});

function initSplashScreen() {
  const body = document.body;
  if (!body) return;

  const hasSeenSplash = sessionStorage.getItem('greensproutSplashSeen') === 'true';
  if (hasSeenSplash) {
    return;
  }

  const splash = document.createElement('div');
  splash.id = 'splashScreen';
  splash.innerHTML = `
    <div class="splash-inner">
      <img src="images/logo.png" alt="GreenSprout logo" class="splash-logo">
      <div class="splash-text-wrap">
        <span class="splash-badge">Small choices. Greener living.</span>
        <h1>GreenSprout</h1>
      </div>
    </div>
  `;

  body.appendChild(splash);
  sessionStorage.setItem('greensproutSplashSeen', 'true');

  requestAnimationFrame(() => {
    body.classList.add('splash-visible');
  });

  window.setTimeout(() => {
    body.classList.add('splash-finished');
    window.setTimeout(() => {
      splash.remove();
    }, 700);
  }, 1400);
}

// Sticky Navigation Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar, header');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.navbar nav, header nav');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav-open');
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('nav-open');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function initFavoritesNavigation() {
  const navMenu = document.querySelector('.navbar nav, header nav');
  if (!navMenu) return;

  let favoritesLink = navMenu.querySelector('a[href="favorites.html"]');
  if (!favoritesLink) {
    favoritesLink = document.createElement('a');
    favoritesLink.href = 'favorites.html';
    favoritesLink.className = 'favorites-nav-link';
    favoritesLink.innerHTML = 'Favourites <span class="favorites-nav-count" aria-hidden="true" hidden>0</span>';
    const cartLink = navMenu.querySelector('a[href="cart.html"]');
    navMenu.insertBefore(favoritesLink, cartLink);
  }

  const updateCount = () => {
    const countBadge = favoritesLink.querySelector('.favorites-nav-count');
    if (!countBadge) return;
    const count = typeof getWishlist === 'function' ? getWishlist().length : 0;
    countBadge.textContent = String(count);
    countBadge.hidden = count === 0;
    favoritesLink.setAttribute('aria-label', count ? `Favourites, ${count} saved items` : 'Favourites');
  };

  updateCount();
  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('.wishlist-btn[data-id]')) {
      updateCount();
    }
  });
  window.addEventListener('storage', event => {
    if (event.key === WISHLIST_STORAGE_KEY) updateCount();
  });
}

// Highlight Current Page Link in Header
function highlightActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.toLowerCase() === path.toLowerCase() || (path === '' && href.toLowerCase() === 'index.html'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

function initChatWidget() {
  const widget = document.createElement('div');
  widget.className = 'chat-widget';
  widget.innerHTML = `
    <section class="chat-panel" id="siteChatPanel" aria-labelledby="siteChatTitle" hidden>
      <header class="chat-header">
        <div>
          <h2 id="siteChatTitle">GreenSprout Chat</h2>
          <p>Here to help with your order</p>
        </div>
        <button class="chat-close" type="button" aria-label="Close chat">×</button>
      </header>
      <div class="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
        <div class="chat-message chat-message-assistant">Hi there! What can I help you find today?</div>
        <div class="chat-prompts">
          <button type="button" data-chat-prompt="Show me the products">Shop products</button>
          <button type="button" data-chat-prompt="How do delivery and returns work?">Delivery &amp; returns</button>
        </div>
      </div>
      <form class="chat-form">
        <label class="chat-sr-only" for="siteChatInput">Message</label>
        <input id="siteChatInput" type="text" maxlength="240" placeholder="Ask about a product or order" autocomplete="off" required>
        <button type="submit" aria-label="Send message">Send</button>
      </form>
    </section>
    <button class="chat-launcher" type="button" aria-label="Open GreenSprout chat" aria-expanded="false" aria-controls="siteChatPanel" title="Chat with GreenSprout">
      <span aria-hidden="true">💬</span>
    </button>
  `;
  document.body.appendChild(widget);

  const panel = widget.querySelector('.chat-panel');
  const launcher = widget.querySelector('.chat-launcher');
  const closeButton = widget.querySelector('.chat-close');
  const messages = widget.querySelector('.chat-messages');
  const form = widget.querySelector('.chat-form');
  const input = widget.querySelector('#siteChatInput');

  const setOpen = isOpen => {
    panel.hidden = !isOpen;
    launcher.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) input.focus();
    else launcher.focus();
  };

  const addMessage = (text, sender, link, productList) => {
    const message = document.createElement('div');
    message.className = `chat-message chat-message-${sender}`;
    message.append(document.createTextNode(text));
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      message.append(document.createTextNode(' '), anchor);
    }
    if (productList?.length) {
      const list = document.createElement('div');
      list.className = 'chat-product-list';
      productList.forEach(product => {
        const productLink = document.createElement('a');
        productLink.className = 'chat-product-item';
        productLink.href = `product.html?id=${product.id}`;
        productLink.textContent = `${product.name} - ${formatPrice(product.price)}`;
        list.appendChild(productLink);
      });
      message.appendChild(list);
    }
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const getReply = question => {
    const normalizedQuestion = question.toLowerCase();
    const compactQuestion = normalizedQuestion.replace(/[^a-z0-9]/g, '');
    const catalog = typeof products === 'undefined' ? [] : products;
    const product = catalog.find(item => {
      const terms = item.name.toLowerCase().split(/\W+/).filter(term => term.length >= 4);
      const compactName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return compactQuestion.includes(compactName) || terms.some(term => (
        normalizedQuestion.includes(term) || compactQuestion.includes(term)
      ));
    });

    if (product) {
      const stockText = product.stock > 0 ? 'In stock.' : 'Currently out of stock.';
      return {
        text: `${product.name} is ${formatPrice(product.price)}. ${stockText} ${product.description}`,
        link: { href: `product.html?id=${product.id}`, label: 'View product' }
      };
    }

    if (/ship|deliver|return|refund/.test(normalizedQuestion)) {
      return {
        text: 'Our team can help with delivery and returns details.',
        link: { href: 'contact.html', label: 'Contact us' }
      };
    }

    if (/cart|checkout|payment|order/.test(normalizedQuestion)) {
      return {
        text: 'You can review your items and continue to checkout from your cart.',
        link: { href: 'cart.html', label: 'View cart' }
      };
    }

    if (/product|products|catalog|shop|browse|sell/.test(normalizedQuestion)) {
      return {
        text: 'Here are the products we have available:',
        productList: catalog
      };
    }

    return {
      text: 'I can help with product and order questions. Our team can help with anything else.',
      link: { href: 'Shop.html', label: 'Browse products' }
    };
  };

  launcher.addEventListener('click', () => setOpen(panel.hidden));
  closeButton.addEventListener('click', () => setOpen(false));
  widget.addEventListener('click', event => {
    const prompt = event.target.closest('[data-chat-prompt]');
    if (!prompt) return;
    input.value = prompt.dataset.chatPrompt;
    form.requestSubmit();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, 'user');
    input.value = '';
    const reply = getReply(question);
    addMessage(reply.text, 'assistant', reply.link, reply.productList);
    input.focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false);
  });
}

// Newsletter Subscription Handler
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        if (typeof showToast === 'function') {
          showToast(`Thank you for subscribing! 🌿 Check ${input.value} for eco-tips & 10% off.`, 'success');
        } else {
          alert('Thank you for subscribing to GreenSprout!');
        }
        input.value = '';
      }
    });
  });
}

// Back to top smooth button
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
