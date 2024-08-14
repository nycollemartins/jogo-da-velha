const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.querySelector('.restart-button');

let isXTurn = true;
let board = Array(9).fill(null); // Armazena o estado do tabuleiro

const WINNING_COMBINATIONS = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
];

function checkWinner() {
    for (let combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    
    if (board[index] || checkWinner()) return;
    
    board[index] = isXTurn ? 'X' : 'O';
    cell.textContent = board[index];
    
    const winner = checkWinner();
    if (winner) {
        messageElement.textContent = `Jogador ${winner} ganhou!`;
    } else if (board.every(cell => cell)) {
        messageElement.textContent = 'Empate!';
    }
    
    isXTurn = !isXTurn;
}

function restartGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    messageElement.textContent = '';
    isXTurn = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
