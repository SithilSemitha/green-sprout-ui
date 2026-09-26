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
      <img src="images/logo.svg" alt="GreenSprout logo" class="splash-logo">
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
