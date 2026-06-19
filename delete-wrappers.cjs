const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'public', 'games');
const keep = ['demo-game', '2048', 'hextris', 't-rex-runner', 'racer', 'clumsy-bird', 'tetris'];

const entries = fs.readdirSync(gamesDir, { withFileTypes: true });
let deleted = 0;

for (const entry of entries) {
  if (entry.isDirectory() && !keep.includes(entry.name)) {
    fs.rmSync(path.join(gamesDir, entry.name), { recursive: true, force: true });
    deleted++;
  }
}
console.log(`Deleted ${deleted} wrapper folders.`);
