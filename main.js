import './style.css'

const games = [
  {
    id: 1,
    title: 'Ragdoll Archers (Self-Hosted)',
    category: 'Action / Ragdoll',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '/games/demo-game/index.html'
  },
  {
    id: 2,
    title: 'Neon Strike',
    category: 'Shooter',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '#'
  },
  {
    id: 3,
    title: 'Cyber Racer',
    category: 'Racing',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '#'
  },
  {
    id: 4,
    title: 'Stickman Combat',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '#'
  },
  {
    id: 5,
    title: 'Gravity Runner',
    category: 'Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541abbe5de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '#'
  },
  {
    id: 6,
    title: 'Physics Puzzle',
    category: 'Logic',
    thumbnail: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    url: '#'
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
