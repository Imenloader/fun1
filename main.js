import './style.css'

const games = [
  {
    id: 1,
    title: 'Ragdoll Archers (Self-Hosted Demo)',
    category: 'Action / Ragdoll',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '/games/demo-game/index.html'
  },
  {
    id: 2,
    title: '2048',
    category: 'Puzzle',
    thumbnail: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '/games/2048/index.html'
  },
  {
    id: 3,
    title: 'Hextris',
    category: 'Puzzle / Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '/games/hextris/index.html'
  },
  {
    id: 4,
    title: 'Clumsy Bird',
    category: 'Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '/games/clumsy-bird/index.html'
  },
  {
    id: 5,
    title: 'Tetris',
    category: 'Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541abbe5de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '/games/tetris/index.html'
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
        <button class="play-btn" onclick="window.location.href='${game.url}'">Play Now</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderGames();
});
