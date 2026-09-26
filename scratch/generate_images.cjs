const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function createSVGImage(title, category, color1, color2, strokeCol, iconSvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="bgGrad_${title.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>

  <rect width="600" height="500" fill="url(#bgGrad_${title.replace(/\s+/g, '')})" rx="24"/>
  
  <circle cx="520" cy="80" r="140" fill="#ffffff" opacity="0.12"/>
  <circle cx="80" cy="420" r="100" fill="#ffffff" opacity="0.08"/>
  <path d="M 0,350 Q 300,300 600,400 L 600,500 L 0,500 Z" fill="#ffffff" opacity="0.15"/>

  <g transform="translate(0, 0)">
    <rect x="150" y="60" width="300" height="300" rx="24" fill="#ffffff" opacity="0.95" stroke="${strokeCol}" stroke-width="2"/>
    <g transform="translate(150, 60)">
      ${iconSvg}
    </g>
  </g>

  <rect x="180" y="385" width="240" height="32" rx="16" fill="#1b4332"/>
  <text x="300" y="406" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" fill="#e8f3ee" text-anchor="middle" letter-spacing="1.5">${category.toUpperCase()}</text>
  
  <text x="300" y="445" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" fill="#081c15" text-anchor="middle">${title}</text>
</svg>`;
}

const images = {
  'toothbrush.jpg': createSVGImage(
    'Bamboo Toothbrush', 'Personal Care', '#e8f3ee', '#b7e4c7', '#74c69d',
    `<path d="M 130 50 L 170 50 L 165 240 L 135 240 Z" fill="#d4a373" rx="5"/>
     <rect x="135" y="40" width="30" height="45" fill="#f4f1de" rx="4"/>
     <path d="M 140 45 L 140 75 M 145 45 L 145 75 M 150 45 L 150 75 M 155 45 L 155 75 M 160 45 L 160 75" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/>
     <circle cx="150" cy="180" r="8" fill="#40916c"/>`
  ),
  'handwash.jpg': createSVGImage(
    'Natural Hand Wash', 'Personal Care', '#f4efe6', '#d8f3dc', '#b7e4c7',
    `<rect x="110" y="90" width="80" height="150" rx="15" fill="#e76f51"/>
     <rect x="135" y="55" width="30" height="35" fill="#2b2d42"/>
     <path d="M 120 55 L 180 55 L 180 40 L 140 40 Z" fill="#2b2d42"/>
     <rect x="120" y="120" width="60" height="70" rx="6" fill="#ffffff"/>
     <text x="150" y="150" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1b4332" text-anchor="middle">PURE</text>
     <text x="150" y="168" font-size="10" font-family="sans-serif" fill="#40916c" text-anchor="middle">ORGANIC</text>`
  ),
  'towels.jpg': createSVGImage(
    'Reusable Kitchen Towels', 'Home & Kitchen', '#efe8da', '#b7e4c7', '#52b788',
    `<rect x="80" y="90" width="140" height="150" rx="12" fill="#74c69d" transform="rotate(-6 150 160)"/>
     <rect x="90" y="80" width="140" height="150" rx="12" fill="#f4f1de" stroke="#e76f51" stroke-width="3" transform="rotate(4 150 160)"/>
     <circle cx="160" cy="155" r="25" fill="#52b788" opacity="0.3"/>
     <path d="M 150 155 Q 160 135 170 155" stroke="#1b4332" stroke-width="3" fill="none"/>`
  ),
  'waterbottle.jpg': createSVGImage(
    'Insulated Steel Bottle', 'Zero Waste', '#e8f3ee', '#95d5b2', '#40916c',
    `<rect x="120" y="80" width="60" height="180" rx="20" fill="#2d6a4f"/>
     <rect x="135" y="50" width="30" height="30" rx="6" fill="#d4a373"/>
     <line x1="120" y1="130" x2="180" y2="130" stroke="#74c69d" stroke-width="4"/>
     <circle cx="150" cy="180" r="14" fill="#ffffff" opacity="0.2"/>`
  ),
  'totebag.jpg': createSVGImage(
    'Organic Cotton Tote', 'Zero Waste', '#f4efe6', '#e8f3ee', '#d4a373',
    `<path d="M 110 110 L 190 110 L 200 240 L 100 240 Z" fill="#f4f1de" stroke="#d4a373" stroke-width="3"/>
     <path d="M 130 110 C 130 60 170 60 170 110" stroke="#d4a373" stroke-width="6" fill="none"/>
     <path d="M 150 140 C 135 150 135 180 150 190 C 165 180 165 150 150 140 Z" fill="#40916c"/>`
  ),
  'shampoobar.jpg': createSVGImage(
    'Solid Herbal Shampoo Bar', 'Personal Care', '#e8f3ee', '#d8f3dc', '#74c69d',
    `<rect x="90" y="100" width="120" height="100" rx="25" fill="#e76f51"/>
     <circle cx="150" cy="150" r="30" fill="#f4a261" opacity="0.6"/>
     <path d="M 140 150 Q 150 135 160 150 T 170 150" stroke="#ffffff" stroke-width="3" fill="none"/>`
  ),
  'foodwraps.jpg': createSVGImage(
    'Beeswax Food Wraps', 'Home & Kitchen', '#efe8da', '#f4a261', '#e76f51',
    `<polygon points="150,70 220,110 220,190 150,230 80,190 80,110" fill="#f4a261" stroke="#e76f51" stroke-width="4"/>
     <polygon points="150,90 200,120 200,180 150,200 100,180 100,120" fill="#f4f1de"/>
     <circle cx="150" cy="150" r="15" fill="#2d6a4f"/>`
  ),
  'sponge.jpg': createSVGImage(
    'Loofah Sponge Pack', 'Home & Kitchen', '#e8f3ee', '#b7e4c7', '#52b788',
    `<ellipse cx="150" cy="150" rx="60" ry="75" fill="#e9c46a"/>
     <circle cx="130" cy="130" r="8" fill="#d4a373" opacity="0.6"/>
     <circle cx="165" cy="160" r="10" fill="#d4a373" opacity="0.6"/>
     <circle cx="145" cy="180" r="6" fill="#d4a373" opacity="0.6"/>`
  ),
  'about.jpg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="abGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1b4332"/>
      <stop offset="50%" stop-color="#2d6a4f"/>
      <stop offset="100%" stop-color="#40916c"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#abGrad)" rx="24"/>
  <circle cx="400" cy="300" r="220" fill="#ffffff" opacity="0.05"/>
  <circle cx="400" cy="300" r="160" fill="#ffffff" opacity="0.08"/>
  <g transform="translate(300, 180)">
    <circle cx="100" cy="100" r="90" fill="#e8f3ee"/>
    <path d="M 100,160 Q 100,100 80,60 Q 110,75 100,160 Z" fill="#1b4332"/>
    <path d="M 95,115 C 50,100 40,50 90,65 C 80,85 90,105 95,115 Z" fill="#52b788"/>
    <path d="M 105,95 C 150,80 160,30 110,45 C 120,65 110,85 105,95 Z" fill="#40916c"/>
  </g>
  <text x="400" y="430" font-family="system-ui, sans-serif" font-weight="800" font-size="32" fill="#ffffff" text-anchor="middle">SUSTAINABLE FUTURE</text>
  <text x="400" y="470" font-family="system-ui, sans-serif" font-weight="500" font-size="18" fill="#b7e4c7" text-anchor="middle">Ethical Sourcing • Zero Plastic • 100% Biodegradable</text>
</svg>`,
  'hero-banner.jpg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600">
  <defs>
    <linearGradient id="hGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081c15"/>
      <stop offset="50%" stop-color="#1b4332"/>
      <stop offset="100%" stop-color="#2d6a4f"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="600" fill="url(#hGrad)" rx="30"/>
  <circle cx="850" cy="150" r="280" fill="#74c69d" opacity="0.15"/>
  <circle cx="150" cy="450" r="220" fill="#f4a261" opacity="0.1"/>
  
  <g transform="translate(550, 120)">
    <rect x="0" y="0" width="380" height="380" rx="20" fill="#ffffff" opacity="0.1" stroke="#52b788" stroke-width="2"/>
    <circle cx="190" cy="190" r="140" fill="#e8f3ee" opacity="0.9"/>
    <path d="M 190,290 Q 190,190 150,110 Q 210,135 190,290 Z" fill="#1b4332"/>
    <path d="M 180,210 C 100,180 80,100 170,120 Z" fill="#52b788"/>
    <path d="M 200,180 C 280,150 290,70 210,90 Z" fill="#40916c"/>
  </g>
</svg>`
};

Object.keys(images).forEach(filename => {
  fs.writeFileSync(path.join(imgDir, filename), images[filename]);
});

fs.writeFileSync(path.join(imgDir, 'logo.png'), fs.readFileSync(path.join(imgDir, 'logo.svg')));

console.log('All image assets created successfully!');
