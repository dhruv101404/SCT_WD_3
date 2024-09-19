const gameContainer = document.querySelector('.game');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];


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


const createBoard = () => {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    gameContainer.appendChild(cell);
    cell.addEventListener('click', handleCellClick);
  }
};


const handleStatusDisplay = () => {
  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
  } else if (isDraw()) {
    statusDisplay.textContent = 'Draw!';
    gameActive = false;
  } else {
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }

  updateTurnIndicator(); 
};

// Handle clicks on the board cells
const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    handleStatusDisplay();
    return;
  }

  if (isDraw()) {
    handleStatusDisplay();
    return;
  }

  switchPlayer();
  handleStatusDisplay();
};


const switchPlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

// Check if there's a winner
const checkWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  return roundWon;
};


const isDraw = () => {
  return gameState.every(cell => cell !== "");
};


const resetGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ""));
  statusDisplay.textContent = "Player X's turn";
  updateTurnIndicator();
};


const updateTurnIndicator = () => {
  if (currentPlayer === "X") {
    gameContainer.classList.remove('o-turn');
    gameContainer.classList.add('x-turn');
  } else {
    gameContainer.classList.remove('x-turn');
    gameContainer.classList.add('o-turn');
  }
};


createBoard();
resetButton.addEventListener('click', resetGame);
handleStatusDisplay();
