import { Gameboard } from "./gameboard.js";

const GameStateController = (function() {
    const winLayouts = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    function checkValidMove(pos) {
        let gameboard = Gameboard.getGameboard();
        if(gameboard[pos] === " ") return true;
        return false;
    }
    function checkWon(player) {
        let gameboard = Gameboard.getGameboard();
        for(const layout of winLayouts) {
            if(gameboard[layout[0]] === player.piece && gameboard[layout[1]] === player.piece && gameboard[layout[2]] === player.piece) {
                return true;
            }
        }
        return false;
    }
    return {checkValidMove, checkWon};
})();

export {GameStateController};