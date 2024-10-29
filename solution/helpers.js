// import the prompt-sync module to get user input
const prompt = require('prompt-sync')({ sigint: true });

/* 
Since we only need the game.grid property, we can destructure 
the incoming game object in the parameter list.
*/
const printGrid = ({ grid }) => {
  console.clear();
  grid.forEach(row => {
    console.log(row.join(' '));
  });
  // grid.map(row => row.join(' ')).forEach((val) => console.log(val))
};

// Use prompt to get the current player's inputs
const getNextMove = (game) => {
  console.log("\nIt's " + game.turn + "'s turn. \n")

  const row = prompt("Enter the row of your choice (1, 2, or 3): ");
  const column = prompt("Enter the column of your choice (1, 2, or 3): ");

  return [row, column];
};

// Makes sure that the provided row and column are between 1 and 3
// Makes sure that the spot is not taken already
const validateInput = (game, row, col) => {
  // Make sure the row and columns are in bounds
  if (row < 1 || row > 3 || col < 1 || col > 3) {
    console.log("Please enter a valid row and column. \n");
    return false;
  }

  // make sure the spot in the grid is empty
  else if (game.grid[row][col] !== "_") {
    console.log("That spot is already taken. Please choose another one. \n");
    return false;
  }

  return true;
};

// Checks the game grid for a winning state
const checkForWin = (game) => {
  /* 
  - Each value in this array is an array of objects.
  - Each array represents a set of positions that form a line of 3 (there are winning 8 combinations)
  */
  const winningCombinations = [
    [{ row: 1, column: 1 }, { row: 1, column: 2 }, { row: 1, column: 3 }], // row 1 win
    [{ row: 2, column: 1 }, { row: 2, column: 2 }, { row: 2, column: 3 }], // row 2 win
    [{ row: 3, column: 1 }, { row: 3, column: 2 }, { row: 3, column: 3 }], // row 3 win
    [{ row: 1, column: 1 }, { row: 2, column: 1 }, { row: 3, column: 1 }], // column 1 win
    [{ row: 1, column: 2 }, { row: 2, column: 2 }, { row: 3, column: 2 }], // column 2 win
    [{ row: 1, column: 3 }, { row: 2, column: 3 }, { row: 3, column: 3 }], // column 3 win
    [{ row: 1, column: 1 }, { row: 2, column: 2 }, { row: 3, column: 3 }], // NW -> SE win
    [{ row: 3, column: 1 }, { row: 2, column: 2 }, { row: 1, column: 3 }], // SW -> NE win
  ];

  // For each possible winning combination...
  for (let i = 0; i < winningCombinations.length; i++) {
    // get the three positions
    const [firstPosition, secondPosition, thirdPosition] = winningCombinations[i];

    // get the value ('X' or 'O') at each position in the grid
    const firstValue = game.grid[firstPosition.row][firstPosition.column];
    const secondValue = game.grid[secondPosition.row][secondPosition.column];
    const thirdValue = game.grid[thirdPosition.row][thirdPosition.column];

    // if they are all the same and match the current turn...
    if (
      firstValue === game.turn
      && firstValue === thirdValue
      && secondValue === thirdValue
    ) {
      // the current player is the winner!
      game.winner = game.turn;
      return;
    }
    // otherwise, they aren't all the same, so go to the next combination
  }
  // No winner was found
};

// Places the current player's piece on the board and updates game variables
const playPieceAndCheckForWin = (game, row, col) => {
  game.grid[row][col] = game.turn;
  checkForWin(game);
  game.spacesRemaining--;
  game.turn = game.turn === 'X' ? 'O' : 'X';
};

const endGame = (game) => {
  printGrid(game);
  if (game.winner) { // if the game.winner is "truthy" (that is, 'X' or 'O' and not '')
    return console.log(`${game.winner} wins!`);
  }
  console.log("It's a tie!");
};

module.exports = {
  validateInput,
  playPieceAndCheckForWin,
  getNextMove,
  printGrid,
  endGame
};