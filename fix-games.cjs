const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'public', 'games');
let fixedCount = 0;

function cleanHTML(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Remove bad scripts and wrappers
  content = content.replace(/<script[^>]*src="[^"]*\/js\/main\.js"[^>]*><\/script>/gi, '');
  content = content.replace(/<script[^>]*src="[^"]*shared\/lib\.js"[^>]*><\/script>/gi, '');
  content = content.replace(/<script[^>]*src="[^"]*shared\/gamebreak\.js"[^>]*><\/script>/gi, '');
  content = content.replace(/<script[^>]*src="[^"]*arc\.io\/garlic\.js"[^>]*><\/script>/gi, '');
  content = content.replace(/<script[^>]*src="[^"]*onebigorange-tmm\.tbt\.mx[^"]*"[^>]*><\/script>/gi, '');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.html')) {
      if (cleanHTML(fullPath)) {
        console.log(`Fixed: ${fullPath}`);
        fixedCount++;
      }
    }
  }
}

scanDir(gamesDir);
console.log(`Done. Fixed ${fixedCount} files.`);
