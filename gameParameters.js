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
        ties = 0;
        players = [];
    }
    function clearTurns() {
        turn = 0;
    }
    function addPlayerWin(player) {
        player.wins++;
    }
    function addTie() {
        ties++;
    }
    function addTurn() {
        turn++;
    }
    return {getTurn, getTies, getPlayers, makePlayers, clearGameParameters, clearTurns, addPlayerWin, addTie, addTurn};
})();

export {GameParameters};