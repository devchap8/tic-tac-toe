import { Gameboard } from "./gameboard.js";
import { GameDisplayController } from "./gameDisplayContoller.js";
import { GameParameters } from "./gameParameters.js";
import { GameStateController } from "./gameStateController.js";

const Interaction = (function() {
    const gameGrid = document.querySelector(".gameGrid");
    const newGameButton = document.querySelector(".newGameButton");
    const menuReturnButton = document.querySelector(".menuReturnButton");
    const refreshButton = document.querySelector(".refresh");
    const exitButton = document.querySelector(".exit");

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
                removeGameGridEventListener(); // Put these into 1 function later
                removeRefreshButtonEventListener();
                GameDisplayController.displayGameWinner(currentPlayer);
            }
            else if(turn >=  8) {
                GameParameters.addTie();
                removeGameGridEventListener(); // Put these into 1 function later
                removeRefreshButtonEventListener();
                GameDisplayController.displayGameTied();
            }
        }
    }

    const addRefreshButtonEventListener = () => refreshButton.addEventListener("click", newRound);
    const removeRefreshButtonEventListener = () => refreshButton.removeEventListener("click", newRound);
    function newRound() {
        GameParameters.clearTurns();
        Gameboard.clearBoard();
        GameDisplayController.clearGrid();
        GameDisplayController.displayWinsTies();
        addGameGridEventListener(); // Put these into 1 function later
        addRefreshButtonEventListener();
    }
    const addNewGameButtonEventListener = () => newGameButton.addEventListener("click", function () {
        GameDisplayController.toggleGameEndScreen();
        newRound();
    })

    function addEventListeners() {
        addGameGridEventListener();
        addRefreshButtonEventListener();
        addNewGameButtonEventListener();
    }

    return {addEventListeners}
})();

export {Interaction}