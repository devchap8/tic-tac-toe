const GameParameters = (function() {
    let turn = 0;
    let ties = 0;
    let players = [];
    const getTurn = () => turn;
    const getTies = () => ties;
    class Player {
        constructor(name, piece) {
            this.name = name;
            this.piece = piece;
            this.wins = 0;
        }
    }
    function makePlayers(player1name, player1piece, player2name, player2piece) {
        let player1 = new Player(player1name, player1piece);
        let player2 = new Player(player2name, player2piece);
        players = [player1, player2];
    }
    const getPlayers = () => [...players];
    function clearGameParameters() {
        turn = 0;
        ties = 0;
        players = [];
    }
    function addPlayerWin(playerIndex) {
        players[playerIndex].wins++;
    }
    function addTie() {
        ties++;
    }
    function addTurn() {
        turn++;
    }
    return {getTurn, getTies, getPlayers, makePlayers, clearGameParameters, addPlayerWin, addTie, addTurn};
})();

export {GameParameters};