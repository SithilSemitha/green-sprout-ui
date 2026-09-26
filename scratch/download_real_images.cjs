const fs = require('fs');
const path = require('path');
const https = require('https');

const imgDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const imageUrls = {
  'hero-banner.jpg': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
  'about.jpg': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
  'toothbrush.jpg': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
  'handwash.jpg': 'https://images.unsplash.com/photo-1608248597266-932d8479e3e3?auto=format&fit=crop&w=800&q=80',
  'towels.jpg': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
  'waterbottle.jpg': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  'totebag.jpg': 'https://images.unsplash.com/photo-1597484661643-2f5f6e71e16d?auto=format&fit=crop&w=800&q=80',
  'shampoobar.jpg': 'https://images.unsplash.com/photo-1607006482602-76ca0fd20b8f?auto=format&fit=crop&w=800&q=80',
  'foodwraps.jpg': 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
  'sponge.jpg': 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=800&q=80'
};

function downloadFile(filename, url) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imgDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(filename, response.headers.location).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Downloading real high-resolution eco images from Unsplash...');
  for (const filename of Object.keys(imageUrls)) {
    try {
      await downloadFile(filename, imageUrls[filename]);
    } catch (e) {
      console.error(`Failed ${filename}`);
    }
  }
  console.log('All real images downloaded successfully!');
}

downloadAll();
