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
    console.log(board)
    const getBoard = () => board;

    function Cell() {
        let value = "";

        const addToken = (player) => {
            console.log('addToken')
            value = player;
        };

        const getValue = () => value;

        return { addToken, getValue, value };
    }

    const getTile = (row, col) => {
        if (row < 0 || row > 2 || col < 0 || col > 2) {return null}
        tile = board[row][col].getValue()
        return tile;
    }

    function placeToken(row, col, selection) {
        console.log("Value: " + board[row][col].getValue())
        if (board[row][col].getValue() == "") {
            board[row][col].addToken(selection);
            console.log('Token placed at ' + row + ', ' + col + '[row, col]')
            return true;
        } else {
            return false;
        }
    }

    function printBoard () {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log('printBoard')
        console.log(boardWithValues)
    }

    const resetGame = () => {
        
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
        console.log('checkForWin')
        for (let i = 0; i < 3; i++) {
            if ((gameboard.getTile(i, 0) === gameboard.getTile(i, 1)) && (gameboard.getTile(i, 1) === gameboard.getTile(i, 2))) {
                // Row
                if (gameboard.getTile(i,0) != "") {
                    winner = gameboard.getTile(i, 0)
                    console.log(winner)
                    return winner;
                } else { continue }      
            } else if ((gameboard.getTile(0, i) === gameboard.getTile(1, i)) && (gameboard.getTile(1, i) === gameboard.getTile(2, i))) {
                // Column
                if (gameboard.getTile(0,i) != "") {
                    winner = gameboard.getTile(0, i)
                    console.log(winner)
                    return winner;
                } else { continue }
            }
        }
        if ((gameboard.getTile(0, 0) === gameboard.getTile(1, 1)) && (gameboard.getTile(1, 1) === gameboard.getTile(2, 2))) {
            // Diagonal from top left
            if (gameboard.getTile(0,0) != "") {
                winner = gameboard.getTile(0, 0)
                console.log('Winner: ' + winner)
                return winner;
            }
        }
        if ((gameboard.getTile(2, 0) === gameboard.getTile(1, 1)) && (gameboard.getTile(1, 1) === gameboard.getTile(0, 2))) {
            //Diagonal from bottom left
            if (gameboard.getTile(2,0) != ""){
                winner = gameboard.getTile(2, 0)
                console.log(winner)
                return winner;
            }
        }
        console.log('returning winner: ')
        return winner;
    }   

    let turn = 0;
    let winner = false;
    const playRound = (row, col) => {
        // Attempt to play tile
        let placed = gameboard.placeToken(row, col, activePlayer.getToken())
        console.log('placed: ' + placed)
        if (placed) {
            // Check for line
            if (turn > 3) {
                winner = checkForWin();
                console.log('playRound, ' + winner)
                if (winner) {
                    console.log('winner loop')
                    // End of Game

                    // Moved the following to displayController
                    // const tiles = document.getElementsByClassName('tile');
                    // for (var i=0; i < tiles.length; i++){
                    //     tiles[i].style.display = "none";
                    // }
                    // let winScreen = document.createElement('div')
                    // winScreen.classList.add('gameWon')
                    // winScreen.innerHTML = `
                    //     <p>Winner!! ${winner} wins</p>
                    //     <button class="newGame">New Game</button>
                    // `
                    // let boardDiv = document.querySelector('div.board')
                    // boardDiv.appendChild(winScreen)

                    // Need some way to reset game

                    return "won";
                } else {
                    turn++;
                    // Switch player
                    _changeActivePlayer();
                    return false;
                }
            } else {
                turn++;
                _changeActivePlayer();
                return false;
            }

             
        } else {
            // Token not placed
            return "spot taken"
        }
    }

    // Reset all tiles 
    const newGame = () => {

    }

    return {playRound, getActivePlayer}
})();

// DisplayController Module - control the display of the game
const displayController = (() => {
    // const game = gameController()
    const boardDiv = document.querySelector(".board")
    const updateScreen = () => {
        // Clear board
        boardDiv.textContent = "";
        // Get current board and player
        const board = gameboard.getBoard();
        console.log(board)
        const activePlayer = gameController.getActivePlayer();
        // Render each tile
        for (let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                const tileButton = document.createElement('button');
                tileButton.dataset.row = i;
                tileButton.dataset.column = j;
                tileButton.classList.add('tile');
                tileButton.textContent = board[i][j].getValue();
                boardDiv.appendChild(tileButton);
            }
        }
    }

    const tileTakenAlert = () => {
        console.log("spot taken")
        let alertDiv = document.createElement('div')
        alertDiv.classList.add('tileTaken')
        alertDiv.innerHTML = `
        <p>Tile already taken.<br>Choose another tile!</p>`
        boardDiv.appendChild(alertDiv)
    }

    const gameWon = () => {
        const tiles = document.getElementsByClassName('tile');
        for (var i=0; i < tiles.length; i++){
            tiles[i].style.display = "none";
        }
        let winner = gameController.getActivePlayer();
        console.log(winner)
        let winScreen = document.createElement('div')
        winScreen.classList.add('gameWon')
        winScreen.innerHTML = `
            <p>Winner!! ${winner.name} wins</p>
            <button class="newGame">New Game</button>
        `
        let boardDiv = document.querySelector('div.board')
        boardDiv.appendChild(winScreen)
    }

    // Add event listener to board
    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedColumn || !selectedRow) return;

        round = gameController.playRound(selectedRow, selectedColumn);
        // I dont remember what this was gonna do
        if (!round) {updateScreen()
            // Token placed but no winner
        } else if (round == "won"){ 
            // updateScreen()
            // Winner screen should be displayed here, not in gameController
            gameWon()
        
        } else if (round == "spot taken") {
            tileTakenAlert()
        }
    }
    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
})();

// displayController();