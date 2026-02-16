import { Gameboard } from "./gameboard.js";
import { GameDisplayController } from "./gameDisplayContoller.js";
import { GameParameters } from "./gameParameters.js";
import { GameStateController } from "./gameStateController.js";
import { Interaction } from "./interaction.js";

GameParameters.makePlayers("Siamese", "images/siamese.jpg", "Golden Retriever", "images/goldenRetriever.jpg");
const players = GameParameters.getPlayers();

GameParameters.addPlayerWin(players[0]);
GameParameters.addPlayerWin(players[0]);
GameParameters.addPlayerWin(players[0]);
GameParameters.addPlayerWin(players[1]);
GameParameters.addPlayerWin(players[1]);
GameParameters.addTie();

GameDisplayController.toggleSelectScreen();
GameDisplayController.toggleGameScreen();
GameDisplayController.displayPlayerInfo();
GameDisplayController.displayWinsTies();

Interaction.addGameGridEventListener();