const HanoiGame = require('./game');
const HanoiView = require('./hanoi-view');

$( () => {
  const rootEl = $('#tower_game');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
