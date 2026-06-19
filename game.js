import './style.css'

async function loadGamePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = parseInt(urlParams.get('id'));

  if (!gameId) {
    document.getElementById('game-title').innerText = "Game not found";
    return;
  }

  try {
    const res = await fetch('/games.json?t=' + new Date().getTime());
    const games = await res.json();
    
    const currentGame = games.find(g => g.id === gameId);
    if (currentGame) {
      document.getElementById('game-title').innerText = currentGame.title;
      document.getElementById('game-category').innerText = currentGame.category;
      document.getElementById('game-iframe').src = currentGame.url;
      document.title = `${currentGame.title} - ArcadeX`;
    }

    // Populate sidebar with random games
    const sidebar = document.getElementById('sidebar-games');
    const shuffled = games.sort(() => 0.5 - Math.random());
    const suggestions = shuffled.filter(g => g.id !== gameId).slice(0, 8);

    sidebar.innerHTML = suggestions.map(g => `
      <a href="/game.html?id=${g.id}" class="suggested-game">
        <img src="${g.thumbnail}" alt="${g.title}">
        <div class="suggested-info">
          <h4>${g.title}</h4>
          <span>${g.category}</span>
        </div>
      </a>
    `).join('');

  } catch (e) {
    console.error("Failed to load games database", e);
  }
}

document.addEventListener('DOMContentLoaded', loadGamePage);
