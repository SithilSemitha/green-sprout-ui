document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();

  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('.wishlist-btn[data-id]')) {
      renderFavorites();
    }
  });

  window.addEventListener('storage', event => {
    if (event.key === WISHLIST_STORAGE_KEY) renderFavorites();
  });
});

function renderFavorites() {
  const favoritesGrid = document.getElementById('favoritesGrid');
  const favoritesEmpty = document.getElementById('favoritesEmpty');
  const favoritesCount = document.getElementById('favoritesCount');
  if (!favoritesGrid || !favoritesEmpty || !favoritesCount) return;

  const savedIds = getWishlist();
  const favorites = products.filter(product => savedIds.includes(product.id));
  favoritesGrid.replaceChildren();

  favorites.forEach(product => {
    const stockInfo = getStockStatus(product.stock);
    let badgeClass = 'badge-ecopick';
    if (product.badge === 'BEST SELLER') badgeClass = 'badge-bestseller';
    if (product.badge === 'NEW') badgeClass = 'badge-new';
    if (product.badge === 'LOW STOCK') badgeClass = 'badge-lowstock';
    if (product.stock === 0) badgeClass = 'badge-outofstock';

    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <span class="product-card-badge ${badgeClass}">${product.stock === 0 ? 'OUT OF STOCK' : product.badge}</span>
      <button class="wishlist-btn active" onclick="toggleWishlist(${product.id})" aria-label="Remove from favourites" aria-pressed="true" data-id="${product.id}"></button>
      <a href="product.html?id=${product.id}" class="product-image-link">
        <img src="${product.image}" alt="${product.name}" class="product-card-image" loading="lazy">
      </a>
      <div class="product-card-content">
        <div class="product-rating">${product.reviewsCount ? `★★★★★ <span>(${product.reviewsCount})</span>` : 'No reviews yet'}</div>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.description}</p>
        <div class="product-price-row">
          <span>${formatPrice(product.price)}</span>
          <span class="stock-indicator ${stockInfo.class}">${stockInfo.text}</span>
        </div>
        <div class="product-buttons">
          <a href="product.html?id=${product.id}" class="view-product-button">View Detail</a>
          <button class="add-cart-button" onclick="addToCart(${product.id})" ${!stockInfo.canAdd ? 'disabled' : ''}>
            ${stockInfo.canAdd ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    `;
    favoritesGrid.appendChild(card);
  });

  favoritesGrid.hidden = favorites.length === 0;
  favoritesEmpty.hidden = favorites.length > 0;
  favoritesCount.textContent = String(favorites.length);
}