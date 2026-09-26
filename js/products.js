/* ==========================================================================
   GREENSPROUT PRODUCT DATABASE & CATALOG MANAGEMENT
   ========================================================================== */

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush (4-Pack)",
    category: "personal",
    price: 450,
    rating: 4.9,
    reviewsCount: 48,
    stock: 24,
    badge: "BEST SELLER",
    image: "images/toothbrush.jpg",
    description: "Natural organic bamboo handles with soft charcoal infused BPA-free bristles.",
    longDescription: "Switch to a sustainable oral hygiene routine with our 4-pack Organic Bamboo Toothbrushes. Crafted from 100% biodegradable sustainably harvested moso bamboo, featuring ergonomic water-resistant handles and soft, charcoal-infused bristles that effectively clean while gentle on sensitive gums.",
    materials: "100% Moso Bamboo, Castor Oil Nylon Bristles",
    impact: "Replaces 4 plastic toothbrushes, saving ~120g of plastic waste per year.",
    packaging: "100% Plastic-Free Compostable Cardboard Box"
  },
  {
    id: 2,
    name: "Natural Hand Wash Refill (500ml)",
    category: "personal",
    price: 850,
    rating: 4.8,
    reviewsCount: 32,
    stock: 8,
    badge: "ECO PICK",
    image: "images/handwash.jpg",
    description: "Nourishing aloe vera & tea tree plant-based hand wash concentrate.",
    longDescription: "Formulated with pure botanical extracts, organic essential oils, and hydrating aloe vera. Our natural hand wash cleanses thoroughly without drying your skin, leaving behind a subtle lavender and eucalyptus scent. Packaged in a concentrated refill pouch designed to reduce single-use plastic bottles.",
    materials: "Aloe Vera Leaf Juice, Coconut Derivatives, Tea Tree & Lavender Oil",
    impact: "Reduces single-use plastic container production by 85%.",
    packaging: "Recyclable Aluminium Refill Pouch"
  },
  {
    id: 3,
    name: "Reusable Kitchen Towels (10-Pack)",
    category: "home",
    price: 1200,
    rating: 4.7,
    reviewsCount: 56,
    stock: 12,
    badge: "ECO PICK",
    image: "images/towels.svg?v=2",
    description: "Ultra-absorbent washable organic cotton un-paper towels.",
    longDescription: "Replace single-use paper towels forever! Our 10-pack reusable kitchen towels are made from double-layered 100% GOTS certified organic unbleached cotton. Soft, durable, and super absorbent, they naturally cling together so you can roll them onto standard paper towel holders.",
    materials: "100% GOTS Certified Organic Cotton",
    impact: "Saves an average family 24 paper towel rolls every single year.",
    packaging: "Recycled Kraft Paper Wrap"
  },
  {
    id: 4,
    name: "Insulated Steel Flask (750ml)",
    category: "zerowaste",
    price: 2450,
    rating: 4.9,
    reviewsCount: 71,
    stock: 5,
    badge: "LOW STOCK",
    image: "images/waterbottle.jpg",
    description: "Double-wall vacuum insulated stainless steel flask keeps drinks cold for 24h.",
    longDescription: "Stay hydrated responsibly with our premium 18/8 food-grade stainless steel insulated water bottle. Vacuum insulation technology keeps beverages icy cold for 24 hours or piping hot for 12 hours. Features a leak-proof bamboo cap and sweat-free powder coating.",
    materials: "18/8 Food-Grade Stainless Steel, Natural Bamboo Cap",
    impact: "Eliminates ~167 single-use plastic water bottles annually per person.",
    packaging: "Minimalist Recycled Cardboard Cylinder"
  },
  {
    id: 5,
    name: "Organic Cotton Tote Bag",
    category: "zerowaste",
    price: 950,
    rating: 4.6,
    reviewsCount: 29,
    stock: 18,
    badge: "NEW",
    image: "images/totebag.jpg",
    description: "Heavy-duty canvas grocery bag with reinforced handles & inner pocket.",
    longDescription: "Our spacious organic cotton canvas tote is engineered for heavy grocery runs and daily commutes. Features double-stitched reinforced handles, a wide base, and an internal zippered pocket for keys and phone.",
    materials: "100% Unbleached Heavyweight Cotton Canvas",
    impact: "Replaces hundreds of single-use plastic shopping bags.",
    packaging: "Plastic-Free String Tag"
  },
  {
    id: 6,
    name: "Solid Herbal Shampoo Bar (100g)",
    category: "personal",
    price: 750,
    rating: 4.8,
    reviewsCount: 43,
    stock: 3,
    badge: "LOW STOCK",
    image: "images/shampoobar.jpg",
    description: "Zero-waste shampoo bar infused with rosemary, neem & coconut oil.",
    longDescription: "Formulated without sulfates, parabens, or synthetic fragrance. This solid shampoo bar lathers into a luxurious rich foam that nourishes hair roots, balances scalp oils, and lasts up to 80 washes (equivalent to 2-3 liquid shampoo bottles).",
    materials: "Saponified Coconut Oil, Neem Extract, Essential Oil Blend",
    impact: "Saves up to 3 plastic shampoo bottles per bar.",
    packaging: "Biodegradable Plantable Seed Paper Box"
  },
  {
    id: 7,
    name: "Beeswax Food Wraps (Set of 3)",
    category: "home",
    price: 1350,
    rating: 4.7,
    reviewsCount: 38,
    stock: 0,
    badge: "OUT OF STOCK",
    image: "images/foodwraps.jpg",
    description: "Natural cling-wrap alternative made from cotton & sustainably harvested beeswax.",
    longDescription: "Keep food fresh naturally! Hand-infused with organic cotton, natural beeswax, jojoba oil, and tree resin. Seal bowls, wrap cheese, bread, and fruits using the warmth of your hands. Washable, reusable, and fully compostable at end of life.",
    materials: "Organic Cotton, Beeswax, Jojoba Oil, Tree Resin",
    impact: "Replaces plastic cling wrap and aluminium foil completely.",
    packaging: "Recyclable Envelope"
  },
  {
    id: 8,
    name: "Natural Loofah Sponge Pack (3-Pack)",
    category: "home",
    price: 600,
    rating: 4.5,
    reviewsCount: 21,
    stock: 15,
    badge: "ECO PICK",
    image: "images/sponge.jpg",
    description: "100% plant-based compostable dish scrubber loofah sponges.",
    longDescription: "Say goodbye to synthetic plastic sponges that shed microplastics down the drain! Our 100% natural loofah sponges soften in water, scrub cookware effectively without scratching surfaces, and decompose completely in home garden compost.",
    materials: "100% Natural Dried Luffa Gourds",
    impact: "Zero microplastic pollution in waterways.",
    packaging: "Paper Sleeve"
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
