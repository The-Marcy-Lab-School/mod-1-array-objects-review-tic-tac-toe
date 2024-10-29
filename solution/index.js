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
  while (game.spacesRemaining > 0 && !game.winner) {
    // Print the grid at the start of each turn
    printGrid(game);

    // Get the current player's next move
    const [row, column] = getNextMove(game);

    // if the move is valid...
    if (validateInput(game, row, column)) {
      // ... place that "piece" in the grid, check for a win, and go to the next player
      playPieceAndCheckForWin(game, row, column);
    }
  }

  endGame(game);
};

main();
