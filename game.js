import './style.css'

async function loadGamePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = parseInt(urlParams.get('id'));

  if (!gameId) {
    document.getElementById('game-title').innerText = 'Game not found';
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

    const btn = document.getElementById('fullscreen-btn');
    const container = document.getElementById('game-container');
    if (btn && container) {
      btn.addEventListener('click', () => {
        container.classList.toggle('theater-mode');
        if (container.classList.contains('theater-mode')) {
          btn.innerText = '⛶ Exit Theater';
        } else {
          btn.innerText = '⛶ Fullscreen';
        }
      });
    }

    // Populate More Games as grid cards
    const grid = document.getElementById('sidebar-games');
    const shuffled = [...games].sort(() => 0.5 - Math.random());
    const suggestions = shuffled.filter(g => g.id !== gameId).slice(0, 18);

    grid.innerHTML = suggestions.map(g => `
      <a href="/game.html?id=${g.id}" class="more-game-card">
        <img src="${g.thumbnail}" alt="${g.title}" loading="lazy"
             onerror="this.src='https://placehold.co/320x180/0f1115/00d2ff?font=Montserrat&text=${encodeURIComponent(g.title)}'">
        <div class="card-info">
          <h4>${g.title}</h4>
          <span>${g.category}</span>
        </div>
      </a>
    `).join('');

  } catch (e) {
    console.error('Failed to load games database', e);
  }
}

document.addEventListener('DOMContentLoaded', loadGamePage);
