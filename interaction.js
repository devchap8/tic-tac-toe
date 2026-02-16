import { Gameboard } from "./gameboard.js";
import { GameDisplayController } from "./gameDisplayContoller.js";
import { GameParameters } from "./gameParameters.js";
import { GameStateController } from "./gameStateController.js";

const Interaction = (function() {
    const gameGrid = document.querySelector(".gameGrid");

    const addGameGridEventListener = () => gameGrid.addEventListener("click", playerClicksGrid);
    const removeGameGridEventListener = () => gameGrid.removeEventListener("click", playerClicksGrid);
    function playerClicksGrid(event) {
        if(event.target.classList.contains("gridBlock")) {
            const currentPos = event.target.getAttribute("pos");
            if(!GameStateController.checkValidMove(currentPos)) return;
            const players = GameParameters.getPlayers();
            const turn = GameParameters.getTurn();
            const currentPlayer = players[turn % 2];
            GameParameters.addTurn();
            Gameboard.placePiece(currentPlayer.piece, currentPos);
            GameDisplayController.displayPiece(currentPlayer, currentPos);
            if(GameStateController.checkWon(currentPlayer)) {
                GameParameters.addPlayerWin(currentPlayer);
                removeGameGridEventListener();
                GameDisplayController.displayGameWinner(currentPlayer);
            }
            else if(turn >=  8) {
                GameParameters.addTie();
                removeGameGridEventListener();
                GameDisplayController.displayGameTied();
            }
        }
    }
    return {addGameGridEventListener}
})();

export {Interaction}