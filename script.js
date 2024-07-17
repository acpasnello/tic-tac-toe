// Gameboard Module
const gameboard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

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

        const clearCell = () => {
            value = "";
        }

        return { addToken, clearCell, getValue, value };
    }

    const getTile = (row, col) => {
        if (row < 0 || row > 2 || col < 0 || col > 2) {return null}
        tile = board[row][col].getValue()
        return tile;
    }

    function placeToken(row, col, selection) {
        // console.log("Value: " + board[row][col].getValue()) -- Logs "Value: " every time
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

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j].getValue() != "") {
                    board[i][j].clearCell()
                } else {continue}
            }
        }
    }

    return { getTile, getBoard, placeToken, printBoard, resetBoard };
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
    // Is it simpler to check that at least 5 tokens have been placed here?
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
        return winner;
    }   

    let turn = 0;
    let winner = false;
    const playRound = (row, col) => {
        // Attempt to play tile
        let placed = gameboard.placeToken(row, col, activePlayer.getToken())
        console.log('turn: ' + turn)
        console.log('placed: ' + placed)
        if (placed) {
            // Check for line - here turn is equal to 1 less than the number of tiles taken
            if (turn > 3) {
                winner = checkForWin();
                console.log('playRound, ' + winner)
                if (winner) {
                    console.log('winner loop')
                    // End of Game
                    return "won";
                } else {
                    if (turn < 8) {
                        turn++;
                        console.log('turn: ' + turn)
                        _changeActivePlayer();
                        return false;
                    } else {
                        // Board full
                        return 'draw';
                    }
                }
            } else {
                turn++;
                _changeActivePlayer();
                console.log('turn: ' + turn)
                return false;
            }

             
        } else {
            // Token not placed
            return "spot taken"
        }
    }

    // Reset all tiles and parameters of game
    const newGame = () => {
        turn = 0;
        winner = false;
        gameboard.resetBoard()
    }

    return {playRound, getActivePlayer, newGame}
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
        console.log(board) // this prints an empty board to console
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

    function hideTiles() {
        const tiles = document.getElementsByClassName('tile');
        for (var i=0; i < tiles.length; i++){
            tiles[i].style.display = "none";
        }
    }
    const gameWon = () => {
        const tiles = document.getElementsByClassName('tile');
        for (var i=0; i < tiles.length; i++){
            tiles[i].style.display = "none";
        }
        let winner = gameController.getActivePlayer();
        console.log(winner)
        let winScreen = document.createElement('div')
        winScreen.classList.add('gameEnd')
        winScreen.innerHTML = `
            <p>Winner!! ${winner.name} wins</p>
            <button class="newGame">New Game</button>
        `
        let boardDiv = document.querySelector('div.board')
        boardDiv.appendChild(winScreen)
        let newGameButton = document.querySelector('button.newGame')
        newGameButton.addEventListener('click', startNewGame)
    }

    const gameDrawn = () => {
        let drawScreen = document.createElement('div')
        drawScreen.classList.add('gameEnd')
        drawScreen.innerHTML = `
            <p> Draw!</p>
            <p> Board full, no more spots to make a line!</p>
            <button class="newGame">New Game</button>
        `

        hideTiles();
        boardDiv.appendChild(drawScreen)
        let newGameButton = document.querySelector('button.newGame')
        newGameButton.addEventListener('click', startNewGame)
    }
    
    const startNewGame = () => {
        gameController.newGame()
        updateScreen()
    }
    // Add event listener to board
    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedColumn || !selectedRow) return;

        round = gameController.playRound(selectedRow, selectedColumn);

        if (!round) {updateScreen()
            // Token placed but no winner
        } else if (round == "won"){ 
            gameWon()
        } else if (round == "spot taken") {
            tileTakenAlert()
        } else if (round == "draw") { gameDrawn() }
    }
    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
})();
