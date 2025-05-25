import { Game } from "./game";

let gameElem = document.getElementById("game");
let game: Game = new Game(gameElem!);
game.drawBoard();
