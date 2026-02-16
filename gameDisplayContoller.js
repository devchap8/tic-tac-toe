import { GameParameters } from "./gameParameters.js";

const GameDisplayController = (function() {
    const selectScreen = document.querySelector(".selectScreen");
    const gameScreen = document.querySelector(".gameScreen");
    const gameEndScreen = document.querySelector(".gameEndScreen");
    const p1Image = document.querySelector(".leftArea .playerImage");
    const p2Image = document.querySelector(".rightArea .playerImage");
    const p1Name = document.querySelector(".leftArea .playerName");
    const p2Name = document.querySelector(".rightArea .playerName");
    const p1Wins = document.querySelector(".leftArea .playerWins");
    const p2Wins = document.querySelector(".rightArea .playerWins");
    const ties = document.querySelector(".ties");
    const gridBlocks = Array.from(document.querySelectorAll(".gridBlock"));

    function toggleSelectScreen() {
        selectScreen.classList.contains("hidden") ? selectScreen.classList.remove("hidden") : selectScreen.classList.add("hidden");
    }
    function toggleGameScreen() {
        gameScreen.classList.contains("hidden") ? gameScreen.classList.remove("hidden") : gameScreen.classList.add("hidden");
    }
    function toggleGameEndScreen() {
        gameEndScreen.classList.contains("hidden") ? gameEndScreen.classList.remove("hidden") : gameEndScreen.classList.add("hidden");
    }

    function displayPlayerInfo() {
        const players = GameParameters.getPlayers();
        p1Name.innerHTML = players[0].name;
        p2Name.innerHTML = players[1].name;
        p1Image.src = players[0].piece;
        p2Image.src = players[1].piece;
    }
    function displayWinsTies() {
        const players = GameParameters.getPlayers();
        const tieCount = GameParameters.getTies();
        p1Wins.innerHTML = `Wins: ${players[0].wins}`;
        p2Wins.innerHTML = `Wins: ${players[1].wins}`;
        ties.innerHTML = `Ties: ${tieCount}`;
    }
    function displayPiece(player, pos) {
        gridBlocks[pos].innerHTML = `<img src="${player.piece}" height="125px">`;
    }

    return {toggleSelectScreen, toggleGameScreen, toggleGameEndScreen, displayPlayerInfo, displayWinsTies, displayPiece};
})();

export {GameDisplayController}