const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'public', 'games');
const outputFile = path.join(__dirname, 'public', 'games.json');

const games = [];
let idCounter = 1;

games.push({
  id: idCounter++,
  title: 'Ragdoll Archers (Official)',
  category: 'Action',
  thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Official+Ragdoll',
  url: 'https://www.crazygames.com/embed/ragdoll-archers'
});
games.push({
  id: idCounter++,
  title: 'Ragdoll Archers 2',
  category: 'Action',
  thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Archers+2',
  url: 'https://ragdollarchers2.io/'
});
games.push({
  id: idCounter++,
  title: 'Ragdoll Archers Online',
  category: 'Action',
  thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Online',
  url: 'https://ragdollarchersonline.io/'
});

const entries = fs.readdirSync(gamesDir, { withFileTypes: true });

for (const entry of entries) {
  if (entry.isDirectory()) {
    const folderName = entry.name;
    const title = folderName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const thumbText = encodeURIComponent(title);
    const thumbnail = `https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=${thumbText}`;
    
    let indexFile = 'index.html';
    if (folderName === 'racer') indexFile = 'v4.final.html';

    games.push({
      id: idCounter++,
      title: title,
      category: 'Arcade',
      thumbnail: thumbnail,
      url: `/games/${folderName}/${indexFile}`
    });
  }
}

fs.writeFileSync(outputFile, JSON.stringify(games, null, 2));
console.log(`Successfully generated games.json with ${games.length} games!`);
