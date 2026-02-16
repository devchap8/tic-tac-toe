import { Gameboard } from "./gameboard.js";
import { GameDisplayController } from "./gameDisplayContoller.js";
import { GameParameters } from "./gameParameters.js";
import { GameStateController } from "./gameStateController.js";

GameParameters.makePlayers("Siamese", "images/siamese.jpg", "Golden Retriever", "images/goldenRetriever.jpg");
const players = GameParameters.getPlayers();

// Gameboard.placePiece(players[0].piece, 4);
// Gameboard.placePiece(players[0].piece, 3);
// Gameboard.placePiece(players[0].piece, 5);
// console.log(Gameboard.getGameboard());
// console.log(GameStateController.checkWon(players[0]));
// console.log(GameStateController.checkWon(players[1]));

GameParameters.addPlayerWin(0);
GameParameters.addPlayerWin(0);
GameParameters.addPlayerWin(0);
GameParameters.addPlayerWin(1);
GameParameters.addPlayerWin(1);
GameParameters.addTie();

GameDisplayController.toggleSelectScreen();
GameDisplayController.toggleGameScreen();
GameDisplayController.displayPlayerInfo();
GameDisplayController.displayWinsTies();
