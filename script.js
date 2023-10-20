// Gameboard Module
const gameboard = (() => {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    function Cell() {
        let value = "";

        const addToken = (player) => {
            value = player;
        };

        const getValue = () => value;

        return { addToken, getValue };
    }

    function getTile(row, col) {
        return board[row][col];
    }

    function placeToken(row, col, selection) {
        if (board[row][col] == "") {
            board[row][col] = selection;
            return true;
        } else {
            return false;
        }
    }

    function printBoard () {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithValues)
    }

    return { getTile, getBoard, placeToken, printBoard };
})();

// Player factory
const PlayerFactory = (name, token) => {
    this.name = name;
    this.token = token;
    function sayName() {
        console.log(this.name);
    }

    function getToken () {
        return this.token;
    }
    // return public properties + functions
    return { name, getToken };
};

// Module to control the flow of the game
const gameController = (() => {
    const board = gameboard();

    let playerOne = PlayerFactory("Player One", "x");
    let playerTwo = PlayerFactory("Player Two", "o");
    let players = [playerOne, playerTwo];

    let activePlayer = players[0];

    // Function to switch active player
    const _changeActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        return activePlayer;
    }
    
    // Check for rows, diagonals, columns
    const checkForWin = () => {
        for (let i = 0; i < rows; i++) {
            if (board.getTile(i, 0) === board.getTile(i, 1) === board.getTile(i, 2)) {
                // Row
                winner = board[i][0]
            } else if ((i = 0 && (board[i][0] === board[i + 1][1]) === board[i + 2][2])) {
                // Diagonal from top left
                winner = board[i][0]
            } else if ((i = 2 && (board[i][0] === board[i - 1][1]) === board[i - 2][2])) {
                //Diagonal from bottom left
                winner = board[i][0]
            } else if (board)
        }
        return winner;
    }   
    
    const playRound = (row, col) => {
        // Check tile is empty
        board.placeToken(row, col, activePlayer.getToken())
        // Update Tile
        // Check for line
        checkForWin();
        // Switch player
        _changeActivePlayer();
    }

    

    return {playRound}
})();

// DisplayController Module - control the display of the game
const displayController = (() => {
    
})();
