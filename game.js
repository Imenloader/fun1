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
    const iframe = document.getElementById('game-iframe');
    
    if (btn && container) {
      btn.addEventListener('click', () => {
        container.classList.toggle('theater-mode');
        if (container.classList.contains('theater-mode')) {
          btn.innerText = '⛶ Exit Theater';
          container.style.height = ''; // remove inline height
        } else {
          btn.innerText = '⛶ Fullscreen';
          resizeIframe(); // restore calculated height
        }
      });
    }

    // Auto-resize logic
    const resizeIframe = () => {
      if (!container || container.classList.contains('theater-mode')) return;
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) return;
        // Use the inner .container if it exists, otherwise fallback to body
        const innerContainer = iframeDoc.querySelector('.container') || iframeDoc.body;
        // We add a little padding buffer to prevent scrollbars
        const newHeight = innerContainer.scrollHeight + 50; 
        container.style.height = Math.max(newHeight, 600) + 'px';
      } catch (e) {
        // Cross-origin or not ready
      }
    };

    if (iframe) {
      iframe.addEventListener('load', () => {
        resizeIframe();
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (iframeDoc && typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(() => resizeIframe());
            ro.observe(iframeDoc.body);
            const inner = iframeDoc.querySelector('.container');
            if (inner) ro.observe(inner);
          } else {
            setInterval(resizeIframe, 1000);
          }
        } catch (e) {}
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
