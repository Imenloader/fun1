const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'public', 'games');
let removedCount = 0;

const entries = fs.readdirSync(gamesDir, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory()) continue;

  const indexPath = path.join(gamesDir, entry.name, 'index.html');
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, 'utf8');
    
    // Check if the html is extremely small and contains an external iframe
    // OR if the html specifically contains an iframe pointing to http/https
    const hasExternalIframe = /<iframe[^>]*src=["']https?:\/\//i.test(html) || /<iframe[^>]*src=["']\/\//i.test(html);
    
    // Also, some games just use location.href to redirect:
    const hasRedirect = /window\.location\.replace\(["']https?:\/\//i.test(html) || /window\.location\.href\s*=\s*["']https?:\/\//i.test(html);

    if (hasExternalIframe || hasRedirect) {
      console.log(`Removing fake game: ${entry.name}`);
      fs.rmSync(path.join(gamesDir, entry.name), { recursive: true, force: true });
      removedCount++;
    }
  } else {
    // If there is no index.html, it's unplayable on our site anyway.
    console.log(`Removing folder with no index.html: ${entry.name}`);
    fs.rmSync(path.join(gamesDir, entry.name), { recursive: true, force: true });
    removedCount++;
  }
}

console.log(`Removed ${removedCount} fake/broken games.`);
