const board = document.getElementById("board");
const rollBtn = document.getElementById("rollBtn");
const diceResult = document.getElementById("diceResult");
const playerPosText = document.getElementById("playerPosition");

let playerPosition = 1;

// Snake and ladder positions
const snakes = {
  16: 6,
  48: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78
};

const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100
};

// Create the board
function createBoard() {
  for (let i = 100; i >= 1; i--) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell-${i}`;
    cell.textContent = i;
    board.appendChild(cell);
  }
}

function updatePlayer() {
  document.querySelectorAll('.player').forEach(p => p.remove());
  const playerCell = document.getElementById(`cell-${playerPosition}`);
  if (playerCell) {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player');
    playerDiv.textContent = "P";
    playerCell.appendChild(playerDiv);
  }
  playerPosText.textContent = `Player Position: ${playerPosition}`;
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `Roll: ${roll}`;

  if (playerPosition + roll <= 100) {
    playerPosition += roll;

    // Check ladder
    if (ladders[playerPosition]) {
      alert(`Ladder! Climb from ${playerPosition} to ${ladders[playerPosition]}`);
      playerPosition = ladders[playerPosition];
    }

    // Check snake
    if (snakes[playerPosition]) {
      alert(`Oops! Snake from ${playerPosition} to ${snakes[playerPosition]}`);
      playerPosition = snakes[playerPosition];
    }

    updatePlayer();

    if (playerPosition === 100) {
      alert("🎉 You won!");
      rollBtn.disabled = true;
    }
  }
}

rollBtn.addEventListener("click", rollDice);

// Initialize
createBoard();
updatePlayer();
