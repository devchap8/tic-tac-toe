const GameBoard = (function() {
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let board = [row1, row2, row3];
    let neutralPiece = "#";
    function clearBoard() {
        board.forEach( function(row) {
            row.length = 0;
            for(let i=0;i<3;i++) {
                row.push(neutralPiece);
            }
        })
    }
    clearBoard()
    const getGameBoard = () => [...board];
    const getNeutralPiece = () => neutralPiece;
    function placePiece(piece, row, column) {
        // Subtract 1 to match array indecies
        row = row - 1;
        column = column - 1;
        board[row][column] = piece;
    }
    return {clearBoard, getGameBoard, getNeutralPiece, placePiece};
})();

function Player(name, piece) {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
}

const Game = (function () {
    let turn = 0;
    const getTurns = () => turn;
    let players = [];
    function makeGamePlayers(name1, piece1, name2, piece2) {
        if(name1 === name2) return "Player names cannot be identical";
        if(piece1 === piece2) return "Player pieces cannot be identical";
        if(piece1 === GameBoard.getNeutralPiece() || piece2 === GameBoard.getNeutralPiece())
            return `${GameBoard.getNeutralPiece()} is an invalid piece.`; 
        const player1 = Player(name1, piece1);
        const player2 = Player(name2, piece2);
        players = [player1, player2];
        return "Valid";
    }
    const getPlayers = () => players;
    function takeTurn(row, column) {
        if (players.length === 0) return "You must make players before playing";
        const currentPlayer = players[turn % 2];
        if (row < 0 || row > 3) return "Invalid row. Must be 1, 2, or 3";
        if (column < 0 || column > 3) return "Invalid column. Must be 1, 2, or 3";
        let board = GameBoard.getGameBoard();
        if (board[row - 1][column - 1] !== GameBoard.getNeutralPiece()) return "There is already a piece in that position";
        GameBoard.placePiece(currentPlayer.getPiece(), row, column);
        turn++;
        if (checkWon(currentPlayer)) return gameWon(currentPlayer);
        if (turn >= 9) return gameTied();
        return "Valid";
    }
    function checkWon(player) {
        const board = GameBoard.getGameBoard();
        let won = false;
        const checkIfPlayerPiece = (piece) => piece === player.getPiece();
        // horizontal win
        board.forEach(function(row) {
            if(row.every(checkIfPlayerPiece)) won = true;
        })
        // vertical win
        for(let i=0;i<3;i++) {
            if(board.every((row) => row[i] === player.getPiece())) won = true;
        }
        // diagonal win
        const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
        const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
        if(leftDiagonal.every(checkIfPlayerPiece) || rightDiagonal.every(checkIfPlayerPiece)) won = true;
        return won;
    }
    const gameWon = (player) => `${player.getName()} won in ${turn} turns!`;
    const gameTied = () => "The game ended in a tie!";
    function newGame() {
        GameBoard.clearBoard();
        turn = 0;
    }
    return {getTurns, makeGamePlayers, getPlayers, takeTurn, checkWon, gameWon, gameTied, newGame};
})();

