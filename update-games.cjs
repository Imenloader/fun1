const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'public', 'games');
const outputFile = path.join(__dirname, 'public', 'games.json');

// Category mapping based on game name
const categories = {
  'ragdoll': 'Action / Ragdoll',
  'flappy-bird': 'Arcade',
  'clumsy-bird': 'Arcade',
  '2048': 'Puzzle',
  'hextris': 'Puzzle',
  'tetris': 'Puzzle',
  'minesweeper': 'Puzzle',
  'wordle': 'Puzzle',
  'chess': 'Strategy',
  'solitaire': 'Card',
  'cookie-clicker': 'Idle',
  'idle-breakout': 'Idle',
  'slope': 'Action',
  'tunnel-rush': 'Action',
  'geometry-dash': 'Action',
  'geodash': 'Action',
  'a-dance-of-fire-and-ice': 'Rhythm',
  'core-ball': 'Arcade',
  'doodle-jump': 'Arcade',
  'chrome-dino': 'Arcade',
  't-rex-runner': 'Arcade',
  'drift-hunters': 'Racing',
  'drift-boss': 'Racing',
  'drive-mad': 'Racing',
  'motox3m': 'Racing',
  'racer': 'Racing',
  'eggycar': 'Racing',
  'retro-bowl': 'Sports',
  'basketball-stars': 'Sports',
  'paperio2': 'IO',
  'among-us': 'IO',
  'boxhead2play': 'Shooter',
  'getaway-shootout': 'Action',
  'rooftop-snipers': 'Action',
  'stickman-hook': 'Action',
  'stickman-boost': 'Action',
  'happywheels': 'Action',
  'temple-run-2': 'Action',
  'fruitninja': 'Action',
  'vex3': 'Platformer',
  'vex4': 'Platformer',
  'vex5': 'Platformer',
  'ovo': 'Platformer',
  'run': 'Platformer',
  'run4bootleg': 'Platformer',
  'demo-game': 'Demo',
  'tiny-fishing': 'Casual',
  'wordle': 'Puzzle',
};

function getCategory(folderName) {
  if (categories[folderName]) return categories[folderName];
  const lower = folderName.toLowerCase();
  for (const [key, cat] of Object.entries(categories)) {
    if (lower.includes(key)) return cat;
  }
  return 'Arcade';
}

function toTitle(str) {
  return str.replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bIo\b/g, 'IO')
    .replace(/\bT Rex\b/g, 'T-Rex')
    .replace(/\b2play\b/g, '2 Play')
    .replace(/\bMotox3m\b/g, 'Moto X3M')
    .replace(/\bGeodashlite\b/, 'Geometry Dash Lite')
    .replace(/\bGeodash\b/, 'Geometry Dash')
    .replace(/\bEggycar\b/, 'Eggy Car')
    .replace(/\bFruitninja\b/, 'Fruit Ninja')
    .replace(/\bHappywheels\b/, 'Happy Wheels')
    .replace(/\bPaperio2\b/, 'Paper IO 2')
    .replace(/\bBoxhead2play\b/, 'Boxhead 2-Play')
    .replace(/\bStickman Hook\b/, 'Stickman Hook')
    .replace(/\bRun4bootleg\b/, 'Run 3')
    .replace(/\bChrome Dino\b/, 'Chrome Dinosaur');
}

// Hardcoded special entries (external games)
const specialGames = [
  {
    id: 1,
    title: 'Ragdoll Archers (Official)',
    category: 'Action / Ragdoll',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Archers',
    url: '/games/ragdoll-archers-2/index.html'
  },
  {
    id: 2,
    title: 'Ragdoll Archers 2',
    category: 'Action / Ragdoll',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Archers+2',
    url: 'https://ragdollarchers2.io/'
  },
  {
    id: 3,
    title: 'Ragdoll Archers Online',
    category: 'Action / Ragdoll',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Online',
    url: 'https://ragdollarchersonline.io/'
  }
];

// Scan local games directory
const localGames = [];
let idCounter = 4;

const entries = fs.readdirSync(gamesDir, { withFileTypes: true });
const skipFolders = ['.git', 'demo-game'];

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  if (skipFolders.some(s => entry.name === s)) continue;
  if (entry.name.startsWith('.')) continue;

  const indexPath = path.join(gamesDir, entry.name, 'index.html');
  if (!fs.existsSync(indexPath)) continue;

  const title = toTitle(entry.name);
  const category = getCategory(entry.name);
  const encodedTitle = encodeURIComponent(title);
  const thumbnail = `https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=${encodedTitle}`;

  localGames.push({
    id: idCounter++,
    title,
    category,
    thumbnail,
    url: `/games/${entry.name}/index.html`
  });
}

// Sort local games by title
localGames.sort((a, b) => a.title.localeCompare(b.title));

// Re-assign IDs after sort
for (let i = 0; i < localGames.length; i++) {
  localGames[i].id = i + 4;
}

const allGames = [...specialGames, ...localGames];

fs.writeFileSync(outputFile, JSON.stringify(allGames, null, 2));
console.log(`Successfully generated games.json with ${allGames.length} games!`);
allGames.forEach(g => console.log(`  [${g.id}] ${g.title} (${g.category})`));
