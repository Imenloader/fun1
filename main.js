import './style.css'

const games = [
  {
    id: 1,
    title: 'Ragdoll Archers Demo',
    category: 'Action / Ragdoll',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Archers',
    url: '/games/demo-game/index.html'
  },
  {
    id: 2,
    title: '2048',
    category: 'Puzzle',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=2048',
    url: '/games/2048/index.html'
  },
  {
    id: 3,
    title: 'Hextris',
    category: 'Puzzle / Arcade',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Hextris',
    url: '/games/hextris/index.html'
  },
  {
    id: 4,
    title: 'Clumsy Bird',
    category: 'Arcade',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Clumsy+Bird',
    url: '/games/clumsy-bird/index.html'
  },
  {
    id: 5,
    title: 'Tetris',
    category: 'Arcade',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Tetris',
    url: '/games/tetris/index.html'
  },
  {
    id: 6,
    title: 'Ragdoll Archers (Official)',
    category: 'Action',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Official+Ragdoll',
    url: 'https://www.crazygames.com/embed/ragdoll-archers'
  },
  {
    id: 7,
    title: 'Ragdoll Archers 2',
    category: 'Action',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Archers+2',
    url: 'https://ragdollarchers2.io/'
  },
  {
    id: 8,
    title: 'Ragdoll Archers Online',
    category: 'Action',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Ragdoll+Online',
    url: 'https://ragdollarchersonline.io/'
  },
  {
    id: 9,
    title: 'Outrun Racing',
    category: 'Racing',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=Outrun+Racing',
    url: '/games/racer/v4.final.html'
  },
  {
    id: 10,
    title: 'T-Rex Runner',
    category: 'Arcade',
    thumbnail: 'https://placehold.co/600x400/0f1115/00d2ff?font=Montserrat&text=T-Rex+Runner',
    url: '/games/t-rex-runner/index.html'
  }
];

function renderGames() {
  const grid = document.getElementById('game-grid');
  if (!grid) return;

  grid.innerHTML = games.map(game => `
    <div class="game-card">
      <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail" />
      <div class="game-info">
        <h3 class="game-title">${game.title}</h3>
        <p class="game-category">${game.category}</p>
        <button class="play-btn" onclick="window.playGame('${game.url}')">Play Now</button>
      </div>
    </div>
  `).join('');
}

window.playGame = function(url) {
  const overlay = document.getElementById('game-overlay');
  const iframe = document.getElementById('game-iframe');
  iframe.src = url;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

window.closeGame = function() {
  const overlay = document.getElementById('game-overlay');
  const iframe = document.getElementById('game-iframe');
  iframe.src = ''; // Stop the game audio/video
  overlay.classList.add('hidden');
  document.body.style.overflow = 'auto'; // Restore scrolling
}

document.addEventListener('DOMContentLoaded', () => {
  renderGames();
});
