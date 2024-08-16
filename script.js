const board = document.getElementById('board');
const message = document.getElementById('message');
let gameActive = true;
let currentPlayer = 'X';
const gameState = ['', '', '', '', '', '', '', '', ''];

const playerWon = (player, winningCells) => {
    message.innerText = `Игрок ${player} победил!`;
    winningCells.forEach(index => {
        const cell = document.getElementsByClassName('cell')[index];
        cell.classList.add('winner'); 
    });
    gameActive = false;
};

const draw = () => {
    message.innerText = 'Ничья!';
    gameActive = false;
};

const checkWinner = () => {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            playerWon(gameState[a], condition); 
            return;
        }
    }

    if (!gameState.includes('')) {
        draw();
    }
};

const computerMove = () => {
    const availableMoves = gameState.map((value, index) => value === '' ? index : null).filter(v => v !== null);
    if (availableMoves.length > 0) {
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        gameState[randomMove] = 'O';
        const cell = document.getElementsByClassName('cell')[randomMove];
        cell.innerText = 'O';
        cell.classList.add('o');
        checkWinner();
        currentPlayer = 'X';
    }
};

const cellClick = (index) => {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        const cell = document.getElementsByClassName('cell')[index];
        cell.innerText = currentPlayer;
        cell.classList.add('x');
        checkWinner();
        currentPlayer = 'O';
        if (gameActive) {
            setTimeout(computerMove, 500); 
        }
    }
};

const createBoard = () => {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }
};

createBoard();