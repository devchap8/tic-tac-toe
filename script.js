import { Gameboard } from "./gameboard.js";
import { GameDisplayController } from "./gameDisplayContoller.js";
import { GameParameters } from "./gameParameters.js";
import { GameStateController } from "./gameStateController.js";

GameParameters.makePlayers("p1", "X", "p2", "O");
const players = GameParameters.getPlayers();

Gameboard.placePiece(players[0].piece, 4);
Gameboard.placePiece(players[0].piece, 3);
Gameboard.placePiece(players[0].piece, 5);
console.log(Gameboard.getGameboard());
console.log(GameStateController.checkWon(players[0]));
console.log(GameStateController.checkWon(players[1]));
