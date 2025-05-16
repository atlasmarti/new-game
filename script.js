const gridSize = 10;
let board = [];
let playerPos = { x: 0, y: 0 };
let goalPos = { x: 9, y: 9 };
let gameStarted = false;

// Color sequence for the game (colors to move through)
const colorSequence = ['red', 'yellow', 'green', 'blue', 'purple'];

function createBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = ''; // Clear any existing content
    board = [];

    // Generate board tiles
    for (let y = 0; y < gridSize; y++) {
        const row = [];
        for (let x = 0; x < gridSize; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.x = x;
            tile.dataset.y = y;
            tile.style.backgroundColor = 'white';
            tile.addEventListener('click', onTileClick);
            board.push({ x, y, tile, color: 'white' });
            boardElement.appendChild(tile);
            row.push(tile);
        }
    }

    // Set goal position
    const goalTile = board[goalPos.y * gridSize + goalPos.x];
    goalTile.tile.style.backgroundColor = 'gold';
    goalTile.tile.classList.add('goal');

    // Set player position
    const playerTile = board[playerPos.y * gridSize + playerPos.x];
    playerTile.tile.style.backgroundColor = 'blue';
    playerTile.tile.classList.add('active');
}

function onTileClick(event) {
    if (!gameStarted) return;

    const clickedTile = event.target;
    const clickedX = parseInt(clickedTile.dataset.x);
    const clickedY = parseInt(clickedTile.dataset.y);
    
    // Only allow the player to move if the clicked tile is the next color in sequence
    const currentColor = colorSequence.indexOf(board[playerPos.y * gridSize + playerPos.x].color);
    const clickedColor = colorSequence.indexOf(board[clickedY * gridSize + clickedX].color);
    
    if (clickedColor === currentColor + 1) {
        // Move player to the new tile
        board[playerPos.y * gridSize + playerPos.x].tile.classList.remove('active');
        board[playerPos.y * gridSize + playerPos.x].tile.classList.add('visited');
        playerPos = { x: clickedX, y: clickedY };
        board[playerPos.y * gridSize + playerPos.x].tile.classList.add('active');
        board[playerPos.y * gridSize + playerPos.x].tile.style.backgroundColor = colorSequence[currentColor + 1];

        // Check if the player reaches the goal
        if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
            alert('You won! Congratulations!');
            gameStarted = false;
        }
    }
}

function startGame() {
    gameStarted = true;
    createBoard();
}

// Set up the start button to initiate the game
document.getElementById('start-button').addEventListener('click', startGame);
