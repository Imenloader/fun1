import './style.css'

let games = [];

async function init() {
  try {
    const res = await fetch('/games.json');
    games = await res.json();
    renderGames();
  } catch (err) {
    console.error('Failed to load games:', err);
  }
}

function renderGames() {
  const grid = document.getElementById('game-grid');
  if (!grid) return;

  grid.innerHTML = games.map(game => `
    <div class="game-card">
      <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail" />
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
