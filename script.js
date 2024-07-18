const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const winnerModal = document.getElementById('winnerModal');
const modalText = document.getElementById('modalText');
const playAgainBtn = document.getElementById('playAgain');
const closeModal = document.querySelector('.close');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

const handleCellPlayed = (cell, index) => {
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `Player ${currentPlayer}'s turn`;
};

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showModal(`Player ${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        showModal(`Game ended in a draw!`);
        gameActive = false;
        return;
    }

    handlePlayerChange();
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const handleRestartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');
    winnerModal.style.display = "none";
};

const showModal = (message) => {
    modalText.innerText = message;
    winnerModal.style.display = "block";
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);
playAgainBtn.addEventListener('click', handleRestartGame);
closeModal.addEventListener('click', () => winnerModal.style.display = "none");

statusText.innerText = `Player ${currentPlayer}'s turn`;

window.onclick = (event) => {
    if (event.target == winnerModal) {
        winnerModal.style.display = "none";
    }
};
