import { Game } from "./game";

export function startGame() {
  document.getElementById("checkmate__menu")!.style.display = "none";

  let gameElem = document.getElementById("game");
  let game: Game = new Game(gameElem!);
  game.drawBoard();
}

startGame();
