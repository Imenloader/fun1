import './style.css'

let games = [];
let currentCategory = 'All';
let searchQuery = '';

async function init() {
  try {
    const res = await fetch('/games.json?t=' + new Date().getTime());
    games = await res.json();
    setupUI();
    renderGames();
  } catch (err) {
    console.error('Failed to load games:', err);
  }
}

function setupUI() {
  const btnPlay = document.getElementById('btn-play-now');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      if (games.length > 0) {
        const randomGame = games[Math.floor(Math.random() * games.length)];
        window.location.href = `/game.html?id=${randomGame.id}`;
      }
    });
  }

  const navLinks = document.querySelectorAll('#main-nav a');
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.getAttribute('data-category');
        renderGames();
      });
    });
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
      renderGames();
    });
  }
}

function renderGames() {
  const grid = document.getElementById('game-grid');
  if (!grid) return;

  let filteredGames = currentCategory === 'All' 
    ? games 
    : games.filter(g => g.category.includes(currentCategory));

  if (searchQuery) {
    filteredGames = filteredGames.filter(g => g.title.toLowerCase().includes(searchQuery));
  }

  grid.innerHTML = filteredGames.map(game => `
    <div class="game-card">
      <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail" loading="lazy" 
           onerror="this.src='https://placehold.co/320x180/0f1115/00d2ff?font=Montserrat&text=${encodeURIComponent(game.title)}'" />
      <div class="game-info">
        <h3 class="game-title">${game.title}</h3>
        <p class="game-category">${game.category}</p>
        <button class="play-btn" onclick="window.location.href='/game.html?id=${game.id}'">Play Now</button>
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
  init();
});
