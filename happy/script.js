const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart-button");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize the game
function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  restartButton.addEventListener("click", restartGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle a cell click
function handleCellClick() {
  const cellIndex = this.getAttribute("data-index");

  // Check if the cell is already taken
  if (gameState[cellIndex] !== "" || checkWinner()) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
  } else if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a winner
function checkWinner() {
  let winner = false;

  winningConditions.forEach(condition => {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      winner = true;
    }
  });

  return winner;
}

// Restart the game
function restartGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ""));
}

// Start the game
initializeGame();
