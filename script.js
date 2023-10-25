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

    const getTile = (row, col) => {
        if (row < 0 || row > 2 || col < 0 || col > 2) {return null}
        tile = board[row][col].getValue()
        return tile;
        // return board[row][col].getValue();
    }

    function placeToken(row, col, selection) {
        if (board[row][col].getValue() == "") {
            board[row][col].addToken(selection);
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
const PlayerFactory = (playerName, playerToken) => {
    const name = playerName;
    const token = playerToken;
    function sayName() {
        console.log(this.name);
    }

    function getToken () {
        return token;
    }
    // return public properties + functions
    return { name, getToken };
};

// Module to control the flow of the game
const gameController = (() => {

    let playerOne = PlayerFactory("Player One", "x");
    let playerTwo = PlayerFactory("Player Two", "o");
    let players = [playerOne, playerTwo];

    let activePlayer = players[0];

    // Function to switch active player
    const _changeActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        return activePlayer;
    }

    const getActivePlayer = () => activePlayer;
    
    // Check for rows, diagonals, columns
    const checkForWin = () => {
        let winner = false;
        for (let i = 0; i < 3; i++) {
            if ((gameboard.getTile(i, 0) === gameboard.getTile(i, 1)) && (gameboard.getTile(i, 1) === gameboard.getTile(i, 2))) {
                // Row
                if (gameboard.getTile(i,0) != "") {
                    winner = gameboard.getTile(i, 0)
                    break;
                } else { continue }      
            } else if ((gameboard.getTile(0, i) === gameboard.getTile(1, i)) && (gameboard.getTile(1, i) === gameboard.getTile(2, i))) {
                // Column
                if (gameboard.getTile(0,i) != "") {
                    winner = gameboard.getTile(0, i)
                    break;
                } else { continue }
            }
        }
        if ((gameboard.getTile(0, 0) === gameboard.getTile(1, 1)) && (gameboard.getTile(1, 1) === gameboard.getTile(2, 2))) {
            // Diagonal from top left
            if (gameboard.getTile(0,0) != "") {
                winner = gameboard.getTile(0, 0)
            }
        }
        if ((gameboard.getTile(2, 0) === gameboard.getTile(1, 1)) && (gameboard.getTile(1, 1) === gameboard.getTile(0, 2))) {
            //Diagonal from bottom left
            if (gameboard.getTile(2,0) != ""){
                winner = gameboard.getTile(2, 0)
            }
        }
        return winner;
    }   

    let turn = 0;
    let winner = false;
    const playRound = (row, col) => {
        // Attempt to play tile
        gameboard.placeToken(row, col, activePlayer.getToken())
        // Check for line
        if (turn > 3) {
            winner = checkForWin();
        } else {
            turn++;
        }
        
        if (winner) {
            // End of Game
            // Need some way to reset game

            return true;
        } else {
            // Switch player
            _changeActivePlayer();
            return false;
        }
    }

    

    return {playRound, getActivePlayer}
})();

// DisplayController Module - control the display of the game
const displayController = (() => {
    
})();
