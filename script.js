const GameBoard = (function() {
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let board = [row1, row2, row3];
    let neutralPiece = "#";
    function clearBoard() {
        board.forEach( function(row) {
            row.length = 0;
            for(let i=0;i<3;i++) {
                row.push(neutralPiece);
            }
        })
    }
    clearBoard()
    const getGameBoard = () => [...board];
    const getNeutralPiece = () => neutralPiece;
    function placePiece(piece, row, column) {
        // Subtract 1 to match array indecies
        row = row - 1;
        column = column - 1;
        board[row][column] = piece;
    }
    return {clearBoard, getGameBoard, getNeutralPiece, placePiece};
})();

function Player(name, piece) {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
}

const Game = (function () {
    let turn = 0;
    const getTurns = () => turn;
    let players = [];
    function makeGamePlayers(name1, piece1, name2, piece2) {
        if(name1 === name2) return "Player names cannot be identical";
        if(piece1 === piece2) return "Player pieces cannot be identical";
        if(piece1 === GameBoard.getNeutralPiece() || piece2 === GameBoard.getNeutralPiece())
            return `${GameBoard.getNeutralPiece()} is an invalid piece.`; 
        const player1 = Player(name1, piece1);
        const player2 = Player(name2, piece2);
        players = [player1, player2];
        return "Valid";
    }
    const getPlayers = () => players;
    function checkValidMove(row, column) {
        if (players.length === 0) return "You must make players before playing";
        if (row < 0 || row > 3) return "Invalid row. Must be 1, 2, or 3";
        if (column < 0 || column > 3) return "Invalid column. Must be 1, 2, or 3";
        let board = GameBoard.getGameBoard();
        if (board[row - 1][column - 1] !== GameBoard.getNeutralPiece()) return "There is already a piece in that position";
        return "Valid";
    }
    function takeTurn(row, column) {
        if(checkValidMove(row, column) !== "Valid") return "Invalid";
        let board = GameBoard.getGameBoard();
        const currentPlayer = players[turn % 2];
        GameBoard.placePiece(currentPlayer.getPiece(), row, column);
        turn++;
        if (checkWon(currentPlayer)) return gameWon(currentPlayer);
        if (turn >= 9) return gameTied();
        return currentPlayer.getPiece();
        // Return piece to insert into the gameboard
        // This is temporary, final game will have pictures inserted instead of pieces
    }
    function checkWon(player) {
        const board = GameBoard.getGameBoard();
        let won = false;
        const checkIfPlayerPiece = (piece) => piece === player.getPiece();
        // horizontal win
        board.forEach(function(row) {
            if(row.every(checkIfPlayerPiece)) won = true;
        })
        // vertical win
        for(let i=0;i<3;i++) {
            if(board.every((row) => row[i] === player.getPiece())) won = true;
        }
        // diagonal win
        const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
        const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
        if(leftDiagonal.every(checkIfPlayerPiece) || rightDiagonal.every(checkIfPlayerPiece)) won = true;
        return won;
    }
    const gameWon = function(player) { 
        const players = getPlayers();
        players.indexOf(player) === 0 ? givePlayer1Win() : givePlayer2Win();
        return `${player.getName()} won in ${turn} turns!`; 
    }
    const gameTied = function() { 
        giveTie();
        "The game ended in a tie!"; 
    }
    function newGame() {
        GameBoard.clearBoard();
        turn = 0;
    }
    // new
    const playerWins = [0, 0, 0];
    const getPlayerWins = () => [...playerWins];
    function givePlayer1Win() {playerWins[0]++;}
    function givePlayer2Win() {playerWins[1]++;}
    function giveTie() {playerWins[2]++;}
    function startGame() {
        if(game.getPlayers().length !== 2) return;
        playerWins = [0, 0, 0];
        hideSelectScreen();
        showGameScreen();
        let playerImages = document.querySelectorAll(".gameScreen > div > div > img");
        playerImages = Array.from(playerImages);
        let playerNames = document.querySelectorAll(".playerName");
        playerImages[0].setAttribute("src", Game.getPlayers()[0].getPiece());
        playerImages[1].setAttribute("src", Game.getPlayers()[1].getPiece());
        playerNames[0].innerHTML = `Name: ${Game.getPlayers()[0].getName()}`;
        playerNames[1].innerHTML = `Name: ${Game.getPlayers()[1].getName()}`;
        newRound();
    }
    function newRound() {
        GameBoard.clearBoard();
        setPlayerWins();
    }
    function setPlayerWins() {
        let playerWins = document.querySelectorAll(".playerWins");
        playerWins = Array.from(playerWins);
        const gameTies = document.querySelector(".ties");
        playerWins[0].innerHTML = `${getPlayerWins()[0]}`;
        playerWins[1].innerHTML = `${getPlayerWins()[1]}`;
        gameTies.innerHTML = `${getPlayerWins()[2]}`;
    }
    return {getTurns, makeGamePlayers, getPlayers, takeTurn, checkWon, gameWon, gameTied, newGame, 
        checkValidMove, getPlayerWins, givePlayer1Win, givePlayer2Win, giveTie, startGame, newRound, setPlayerWins};
})();

function addGridEventListeners() {
    const gameGrid = document.querySelector(".gameGrid");
    gameGrid.addEventListener("click", addPieceToGrid);
}

function removeGridEventListeners() {
    const gameGrid = document.querySelector(".gameGrid");
    gameGrid.removeEventListener("click", addPieceToGrid);
}

function addPieceToGrid(event) {
    if (event.target.classList.contains("gridBlock")) {
        const row = event.target.getAttribute("row");
        const col = event.target.getAttribute("col");
        if (Game.checkValidMove(row, col) === "Valid") {
            event.target.innerHTML = Game.takeTurn(row, col);
        }
    }
}

function showGameScreen() {
    let gameScreen = document.querySelector(".gameScreen");
    gameScreen.classList.remove("hidden");
}

function hideGameScreen() {
    let gameScreen = document.querySelector(".gameScreen");
    gameScreen.classList.add("hidden");
}

function showSelectScreen() {
    let selectScreen = document.querySelector(".selectScreen");
    selectScreen.classList.remove("hidden");
}

function hideSelectScreen() {
    let selectScreen = document.querySelector(".selectScreen");
    selectScreen.classList.add("hidden");
}

// new 

function addSelectScreenEventListeners() {
    addSelectButtonEventListeners();
    addReadyButtonEventListener();
}

function addSelectButtonEventListeners() {
    const selectScreen = document.querySelector(".selectScreen");
    selectScreen.addEventListener("click", selectPlayer)
}

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

let catDivs = document.querySelectorAll(".catDiv");
let dogDivs = document.querySelectorAll(".dogDiv");
catDivs = Array.from(catDivs);
dogDivs = Array.from(dogDivs);

function checkCatSelected() {
    let catSelected = false;
    for(cat of catDivs) {
        if (cat.classList.contains("selected")) catSelected = true;
    }
    return catSelected;
}

function checkDogSelected() {
    let dogSelected = false;
    for(dog of dogDivs) {
        if (dog.classList.contains("selected")) dogSelected = true;
    }
    return dogSelected;
}

function unselectAll() {
    for (cat of catDivs) {
        if (cat.classList.contains("selected")) cat.classList.remove("selected");
    }
    for (dog of dogDivs) {
        if (dog.classList.contains("selected")) dog.classList.remove("selected");
    }
}

addGridEventListeners();
addSelectButtonEventListeners();
Game.makeGamePlayers("Player1", "X", "Player2", "O");
// showGameScreen();
// hideSelectScreen();

/*
in Game:
private list playerWins[player1Wins, ties, player2Wins], all = 0
function givePlayer1Win - ++playerWins[0]
function giveTie - ++playerWins[1]
function givePlayer2Win - ++playerWins[2]
function getPlayerWins - return [...playerWins]
function startGame
    if Game.getPlayers !== "Valid" return 
    set playerWins = [0, 0, 0]
    hide selectScreen, show gameScreen
    querySelect playerImage and playerText on both sides,
    playerName.innerHTML = getGamePlayers()[playerName index]
    playerImage.setAttribute("src", getGamePlayers()[playerPiece index])
    newRound()
function newRound
    GameBoard.clearBoard()
    setPlayerWins()
function setPlayerWins
    querySelect ties and both playerWins
    set their innerHTML = `Wins/Ties: ${getPlayerWins[index]}`

select screen event listeners:
Function addSelectScreenEventListeners
^^Function addSelectButtonEventListeners
    Target all select screen > div > div with querySelectorAll
    Add event listeners with a function that on click:
        event.target.classList.add("selected") 
^^Function addReadyButtonEventListeners
    target with querySelector(".ready"), function, on click:
        make private list playerImgList with img file paths
        make private playerInfo list
        query select .selected, for each:
            select .lastElementChild (selectName div)
            set playerName variable = element.innerHTML
            get imgIndex with getAttribute("imgIndex")
            set playerPiece to playerImageList[imgIndex]
            add name, piece to playerInfo list
        with playerInfoList items, Game.makeGamePlayers
        startGame()
*/          