import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  
  const context1 = await browser.createBrowserContext();
  const hostPage = await context1.newPage();
  hostPage.on('console', msg => console.log('HOST LOG:', msg.text()));
  hostPage.on('pageerror', err => console.log('HOST ERROR:', err.toString()));
  
  await hostPage.goto('http://localhost:5173/public/games/multiplayer-chess/index.html', { waitUntil: 'networkidle2' });
  
  console.log("Creating game as Host...");
  await hostPage.click('#btn-host');
  
  // Wait for the room code to display
  await hostPage.waitForFunction(() => {
    return !document.getElementById('waiting-panel').classList.contains('hidden') && 
           document.getElementById('room-code-display').innerText.length > 0;
  });
  
  const roomCode = await hostPage.evaluate(() => document.getElementById('room-code-display').innerText);
  console.log("Room created! Code: " + roomCode);
  
  // Joiner page
  const context2 = await browser.createBrowserContext();
  const joinPage = await context2.newPage();
  joinPage.on('console', msg => console.log('JOIN LOG:', msg.text()));
  joinPage.on('pageerror', err => console.log('JOIN ERROR:', err.toString()));
  
  await joinPage.goto('http://localhost:5173/public/games/multiplayer-chess/index.html', { waitUntil: 'networkidle2' });
  
  console.log("Joining game as Joiner...");
  await joinPage.type('#input-code', roomCode);
  await joinPage.click('#btn-join');
  
  // Wait for both games to start
  console.log("Waiting for game panels to appear...");
  await hostPage.waitForFunction(() => !document.getElementById('game-panel').classList.contains('hidden'), { timeout: 15000 });
  await joinPage.waitForFunction(() => !document.getElementById('game-panel').classList.contains('hidden'), { timeout: 15000 });
  
  console.log("Game started successfully! Testing moves...");
  
  // Host makes a move (e2 to e4)
  const e2 = await hostPage.$('.square-e2');
  const e4 = await hostPage.$('.square-e4');
  const e2Box = await e2.boundingBox();
  const e4Box = await e4.boundingBox();
  
  await hostPage.mouse.move(e2Box.x + e2Box.width / 2, e2Box.y + e2Box.height / 2);
  await hostPage.mouse.down();
  await hostPage.mouse.move(e4Box.x + e4Box.width / 2, e4Box.y + e4Box.height / 2);
  await hostPage.mouse.up();
  
  console.log("Host made move e2-e4");
  
  // Wait for Joiner to receive the move
  await new Promise(r => setTimeout(r, 2000));
  
  const joinerFen = await joinPage.evaluate(() => game.fen());
  console.log("Joiner board FEN after host move: " + joinerFen);
  
  if (joinerFen.includes('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR')) {
    console.log("SUCCESS! Move synced perfectly across WebRTC!");
  } else {
    console.log("FAILURE! Move did not sync.");
  }
  
  // Test AI
  console.log("Testing AI mode...");
  const aiPage = await browser.newPage();
  aiPage.on('console', msg => console.log('AI LOG:', msg.text()));
  aiPage.on('pageerror', err => console.log('AI ERROR:', err.toString()));
  await aiPage.goto('http://localhost:5173/public/games/multiplayer-chess/index.html', { waitUntil: 'networkidle2' });
  await aiPage.click('#btn-ai');
  
  console.log("Waiting for AI game to start...");
  await aiPage.waitForFunction(() => !document.getElementById('game-panel').classList.contains('hidden'));
  
  // Make a move e2-e4
  const ai_e2 = await aiPage.$('.square-e2');
  const ai_e4 = await aiPage.$('.square-e4');
  const ai_e2Box = await ai_e2.boundingBox();
  const ai_e4Box = await ai_e4.boundingBox();
  await aiPage.mouse.move(ai_e2Box.x + ai_e2Box.width / 2, ai_e2Box.y + ai_e2Box.height / 2);
  await aiPage.mouse.down();
  await aiPage.mouse.move(ai_e4Box.x + ai_e4Box.width / 2, ai_e4Box.y + ai_e4Box.height / 2);
  await aiPage.mouse.up();
  
  console.log("Played e2-e4 vs AI. Waiting for AI response...");
  
  await new Promise(r => setTimeout(r, 4000));
  
  const aiFen = await aiPage.evaluate(() => game.fen());
  console.log("AI board FEN after response: " + aiFen);
  
  if (aiFen.split(' ')[1] === 'w') {
    console.log("SUCCESS! AI made a response move!");
  } else {
    console.log("FAILURE! AI did not move.");
  }
  
  console.log("Closing browser.");
  await browser.close();
  process.exit(0);
})();
