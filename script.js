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

    function Cell() {
        let value = 0;

        const addToken = (player) => {
            value = player;
        };

        const getValue = () => value;

        return { addToken, getValue };
    }

    function getTile(tile, selection) {
        board[tile].innerText = selection;
    }
    const getBoard = () => board;

    let playerOne = PlayerFactory("Player One", "x");
    let playerTwo = PlayerFactory("Player Two", "o");
    let players = [playerOne, playerTwo];

    return { getTile, getBoard };
})();

// Player factory
const PlayerFactory = (name, token) => {
    this.name = name;
    this.token = token;
    function sayName() {
        console.log(this.name);
    }
    // return public properties + functions
    return { name, sayName };
};

// DisplayController Module
const displayController = (() => {
    let board = gameboard.getBoard();
    function updateTile(tile, selection) {
        board[tile].innerText = selection;
    }
})();
