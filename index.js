const {
  validateInput,
  playPieceAndCheckForWin,
  getNextMove,
  printGrid,
  endGame
} = require('./helpers');

const main = () => {
  // Store all game variables in an object for easy distribution
  const game = {
    grid: [
      ["  ", "1", "2", "3"],
      ["1 ", "_", "_", "_"],
      ["2 ", "_", "_", "_"],
      ["3 ", "_", "_", "_"]
    ],
    turn: 'X',
    spacesRemaining: 9,
    winner: ''
  };

  // Play the game as long as there is no winner yet and spaces remain in the grid
  while (!game.winner && game.spacesRemaining > 0) {
    // Print the grid at the start of each turn
    printGrid(game);

    // Get the current player's next move

    // TODO: Refactor this to use destructuring
    const nextMoves = getNextMove(game);
    const row = nextMoves[0];
    const col = nextMoves[1];

    // if the move is valid...
    if (validateInput(game, row, col)) {
      // ... place that "piece" in the grid, check for a win, and go to the next player
      playPieceAndCheckForWin(game, row, col);
    }
  }

  endGame(game);
};

main();
