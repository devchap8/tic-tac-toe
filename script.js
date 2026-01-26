/*
GameBoard
    *IIFE
    private array of 3 rows, each row array of 3 spaces
    private neutralPiece variable that stores value of empty board spaces
    function getGameBoard to get board, returns board
    function getNeutralPiece, returns neutralPiece
    function placePiece to place piece
        takes piece, row, column
        subtract 1 from row and column to match array indecies
        place piece in board array
            ex. if places in row 3 column 2, board[2][1] = piece
    function clearBoard to clear the game board
        loop through gameboard array, use forEach to replace every piece with original #
    return getGameBoard, getNeutralPiece, placePiece, clearBoard

Player
    *makes new player 
    takes name, piece arguments
    function getName retruns name
    function getPiece returns piece
    return getName, getPiece

Game
    *IIFE
    private turns variable set to 0
    function getTurns, returns turns
    function makeGamePlayers
        takes 4 arguments: piece1, piece2, name1, name2
        if the 2 names are identical:
            return ["Player names cannot be identical"]
        if the 2 pieces are identical:
            return ["Player pieces cannot be identical"]
        if one piece is identical to the neutralPiece in GameBoard:
            return ["(piece) is an invalid game piece"]
        else
            make player1 with name1 and piece1
            make player2 with name2 and piece2
            return [player1, player2]
        *** return everything in arrays for later error checking and error messages
            if the input is invalid, makeGamePlayers returns an array of length 1
            if it is valid, it returns array of length 2
    function takeTurn
        takes 3 arguments: players, row, column
            ??? see if players needs to be taken as an argument or can it be stored within the Game function
        decide this turn's player by calling players[turn % 2]
        if the row or column are not 1, 2, or 3:
            return "Invalid (row or column, depending). Must be 1, 2, or 3"
        check what is in the space by calling board = gameBoard.getGameBoard() and comparing with board[row][column]
        if the piece in that space is not neutralPiece:
            return "There is already a piece in that position"
        else:
            call GameBoard.placePiece(player.piece, row, column)
            increase turns by 1
            call checkWon with player
                if false and turns === 9: 
                    call gameTied()
            return "valid"
        *** these returns are for later error checking and error messages
    function checkWon
        takes player as lone argument
        get copy of board by calling board = gameBoard.getGameBoard()
        3 wincons: row, column, diagonal
        row: forEach row of board, use every() to check if every element === player.piece
            if true, call gameWon()
        column: use a standard for loop
            use every on board to check if row[i] === player.piece
            if true, call gameWon()
        diagonal: 2 manual checks
            if ((board[0][0] === player.piece  && [1][1] && [2][2]) || (board[0][2] === player.piece && [1][1] && [2][0])):
                call gameWon()
    function gameWon
        take player as input
        return `?{player} won in ?{turns} turns!`
    function gameTied
        return "It's a tie game!"
    function newGame
        call board.clear()
        set turns = 0
    return getTurns, makeGamePlayers, takeTurn, checkWon, gameWon, gameTied, newGame
*/

const GameBoard = (function() {
    let row1 = ["#", "#", "#"];
    let row2 = ["#", "#", "#"];
    let row3 = ["#", "#", "#"];
    let board = [row1, row2, row3];

    const getGameBoard = () => [...board];

    function placePiece(piece, row, column) {

    }

    return {getGameBoard};
})();

function Player(name, piece) {
    const getName = () => name;
    const getPiece = () => piece;

    return {getName, getPiece};
}