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
    const selectScreen = document.querySelector(".selectScreen");
    let catDivs = Array.from(document.querySelectorAll(".catDiv"));
    let dogDivs = Array.from(document.querySelectorAll(".dogDiv"));
    const readyButton = document.querySelector(".ready");

    // Game Grid functionality
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
                removeGameEndEventListeners();
                GameDisplayController.displayGameWinner(currentPlayer);
            }
            else if(turn >=  8) {
                GameParameters.addTie();
                removeGameEndEventListeners();
                GameDisplayController.displayGameTied();
            }
        }
    }

    // Buttons at top of grid / during game end screen
    const addRefreshButtonEventListener = () => refreshButton.addEventListener("click", newRound);
    const removeRefreshButtonEventListener = () => refreshButton.removeEventListener("click", newRound);
    function newRound() {
        GameParameters.clearTurns();
        Gameboard.clearBoard();
        GameDisplayController.clearGrid();
        GameDisplayController.displayWinsTies();
        addGameEndEventListeners();
    }
    const addNewGameButtonEventListener = () => newGameButton.addEventListener("click", function () {
        GameDisplayController.toggleGameEndScreen();
        newRound();
    })

    const addExitButtonEventListener = () => exitButton.addEventListener("click", returnToMenu);
    const removeExitButtonEventListener = () => exitButton.removeEventListener("click", returnToMenu);
    function returnToMenu() {
        GameParameters.clearGameParameters();
        GameDisplayController.toggleGameScreen();
        GameDisplayController.toggleSelectScreen();
    }
    const addMenuReturnButtonEventListener = () => menuReturnButton.addEventListener("click", function () {
        GameDisplayController.toggleGameEndScreen();
        returnToMenu();
    })

    // Character Select Menu Functionality
    const addSelectScreenEventListener = () => selectScreen.addEventListener("click", selectPlayer);
    function selectPlayer(event) {
        if(event.target.classList.contains("charSelect") || event.target.parentElement.classList.contains("charSelect")) {
            let charSelect;
            event.target.classList.contains("charSelect") ? charSelect = event.target : charSelect = event.target.parentElement;
            if(charSelect.classList.contains("selected")) charSelect.classList.remove("selected");
            else if(charSelect.classList.contains("catDiv") && checkCatSelected() === false) {
                charSelect.classList.add("selected")
            }
            else if(charSelect.classList.contains("dogDiv") && checkDogSelected() === false) {
                charSelect.classList.add("selected")
            }
        }
    }

    function checkCatSelected() {
        let catSelected = false;
        for(let cat of catDivs) {
            if (cat.classList.contains("selected")) catSelected = true;
        }
        return catSelected;
    }
    function checkDogSelected() {
        let dogSelected = false;
        for(let dog of dogDivs) {
            if (dog.classList.contains("selected")) dogSelected = true;
        }
        return dogSelected;
    }
    function unselectCatsDogs() {
        for (let cat of catDivs) {
            if (cat.classList.contains("selected")) cat.classList.remove("selected");
        }
        for (let dog of dogDivs) {
            if (dog.classList.contains("selected")) dog.classList.remove("selected");
        }
    }

    const addReadyButtonEventListener = () => readyButton.addEventListener("click", startNewGame);
    function startNewGame() {
        const selectedChars = Array.from(document.querySelectorAll(".selected"));
        if(selectedChars.length !== 2) {
            return
        }
        unselectCatsDogs();
        GameParameters.makePlayers(
            selectedChars[0].lastElementChild.innerHTML,
            selectedChars[0].firstElementChild.getAttribute("src"),
            selectedChars[1].lastElementChild.innerHTML,
            selectedChars[1].firstElementChild.getAttribute("src")
        );
        GameDisplayController.toggleSelectScreen();
        GameDisplayController.toggleGameScreen();
        GameDisplayController.displayPlayerInfo();
        newRound();
    }

    function addAllEventListeners() {
        addGameGridEventListener();
        addRefreshButtonEventListener();
        addNewGameButtonEventListener();
        addExitButtonEventListener();
        addMenuReturnButtonEventListener();
        addSelectScreenEventListener();
        addReadyButtonEventListener();
    }
    function addGameEndEventListeners() {
        addGameGridEventListener(); 
        addRefreshButtonEventListener();
        addExitButtonEventListener();
    }
    function removeGameEndEventListeners() {
        removeGameGridEventListener();
        removeRefreshButtonEventListener();
        removeExitButtonEventListener();
    }

    return {addAllEventListeners}
})();

Interaction.addAllEventListeners();