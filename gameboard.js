const Gameboard = (function() {
    let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const getGameboard = () => [...gameboard];
    function clearBoard() {
        gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }
    function placePiece(piece, pos) {
        gameboard[pos] = piece;
    }
    return {getGameboard, clearBoard, placePiece};
})();

export {Gameboard};