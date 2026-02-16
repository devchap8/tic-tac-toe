const GameDisplayController = (function() {
    const selectScreen = document.querySelector(".selectScreen");
    const gameScreen = document.querySelector(".gameScreen");
    const gameEndScreen = document.querySelector(".gameEndScreen");
    function toggleSelectScreen() {
        selectScreen.classList.contains("hidden") ? selectScreen.classList.remove("hidden") : selectScreen.classList.add("hidden");
    }
    function toggleGameScreen() {
        gameScreen.classList.contains("hidden") ? gameScreen.classList.remove("hidden") : gameScreen.classList.add("hidden");
    }
    function toggleGameEndScreen() {
        gameEndScreen.classList.contains("hidden") ? gameEndScreen.classList.remove("hidden") : gameEndScreen.classList.add("hidden");
    }
    return {toggleSelectScreen, toggleGameScreen, toggleGameEndScreen};
})();

export {GameDisplayController}