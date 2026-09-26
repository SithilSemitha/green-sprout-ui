/* ==========================================================================
   GREENSPROUT PRODUCT DATABASE & CATALOG MANAGEMENT
   ========================================================================== */

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    category: "personal",
    price: 399,
    rating: 0,
    reviewsCount: 0,
    stock: 24,
    badge: "NEW",
    image: "images/products/bamboo-toothbrush.jpeg",
    description: "A bamboo-handled toothbrush for a simple, lower-waste daily routine.",
    longDescription: "Make a small change to your daily routine with a toothbrush featuring a bamboo handle and soft bristles. Rinse and air-dry it after use.",
    materials: "Bamboo handle and soft bristles",
    impact: "An alternative to a conventional plastic toothbrush handle.",
    packaging: "As supplied"
  },
  {
    id: 2,
    name: "Natural Hand Wash Refill",
    category: "personal",
    price: 750,
    rating: 0,
    reviewsCount: 0,
    stock: 16,
    badge: "NEW",
    image: "images/products/hand-wash-refill.jpeg",
    description: "A natural hand wash refill for topping up your reusable dispenser.",
    longDescription: "Keep hand washing simple with this natural hand wash refill. Pour it into a reusable dispenser and use it as part of your everyday hand-care routine.",
    materials: "Natural hand wash formula",
    impact: "Refill format for topping up a reusable dispenser.",
    packaging: "Refill packaging"
  },
  {
    id: 3,
    name: "Reusable Kitchen Towels",
    category: "home",
    price: 1200,
    rating: 0,
    reviewsCount: 0,
    stock: 16,
    badge: "NEW",
    image: "images/products/kitchen-towels.jpeg",
    description: "Washable, reusable towels for everyday kitchen cleanups.",
    longDescription: "Use these reusable kitchen towels for everyday spills, wiping counters, and drying dishes. Wash and reuse them as part of your kitchen routine.",
    materials: "Reusable towel fabric",
    impact: "Reusable design helps reduce reliance on disposable paper towels.",
    packaging: "As supplied"
  },
  {
    id: 4,
    name: "Natural Dishwashing Liquid",
    category: "home",
    price: 650,
    rating: 0,
    reviewsCount: 0,
    stock: 16,
    badge: "NEW",
    image: "images/products/dishwashing-liquid.jpeg",
    description: "A natural liquid soap for washing dishes by hand.",
    longDescription: "Make everyday dishwashing straightforward with a natural dishwashing liquid for cleaning plates, cups, and cookware by hand.",
    materials: "Dishwashing liquid formula",
    impact: "A practical everyday dishwashing essential.",
    packaging: "As supplied"
  },
  {
    id: 5,
    name: "Soy Wax Eco Candle",
    category: "home",
    price: 1500,
    rating: 0,
    reviewsCount: 0,
    stock: 16,
    badge: "NEW",
    image: "images/products/soy-wax-candle.jpeg",
    description: "A soy wax candle for a warm, gentle glow at home.",
    longDescription: "Bring a soft glow to your space with this soy wax eco candle. Light it during a quiet evening or add it to your everyday home rituals.",
    materials: "Soy wax",
    impact: "Made with soy wax.",
    packaging: "As supplied"
  }
];

// Helper functions for accessing product catalog
function getProductById(id) {
  return products.find(p => p.id === Number(id));
}

function getProductsByCategory(category) {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
}

// Function to format prices accurately in LKR
function formatPrice(amount) {
  return "LKR " + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Stock status helper
function getStockStatus(stock) {
  if (stock <= 0) {
    return { text: "Out of Stock", class: "out-of-stock", canAdd: false };
  } else if (stock <= 10) {
    return { text: `Only ${stock} left in stock`, class: "low-stock", canAdd: true };
  } else {
    return { text: "In Stock", class: "in-stock", canAdd: true };
  }
}
