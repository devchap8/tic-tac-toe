const GameBoard = (function() {
    let row1 = ["#", "#", "#"];
    let row2 = ["#", "#", "#"];
    let row3 = ["#", "#", "#"];
    let board = [row1, row2, row3];

    const getGameBoard = () => [...board];

    return {getGameBoard};
})();

// function createUser(name, piece) {

// }

function User(name, piece) {
    const getName = () => name;
    const getPiece = () => piece;

    return {getName, getPiece}
}

const user1 = User("user1", "X");


