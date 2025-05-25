import { Board } from "./board";
import { Piece } from "./piece";

export class Game {
  pieces: Piece[];
  board: Board;
  elem: Element;
  turn: (typeof Piece.SIDES)[keyof typeof Piece.SIDES];

  constructor(gameElem: Element) {
    this.elem = gameElem;
    this.pieces = [];
    this.board = new Board(this);
    this.board.registerHandlers();
    this.turn = Piece.SIDES.WHITE;
  }

  reverseTurn() {
    if (this.turn === Piece.SIDES.WHITE) {
      this.turn = Piece.SIDES.BLACK;
    } else {
      this.turn = Piece.SIDES.WHITE;
    }
  }

  drawBoard() {
    this.elem.innerHTML = "";
    this.elem.appendChild(this.board.getElement());

    let historyElem = document.createElement("div");
    historyElem.classList.add("history");
    for (let i = 0; i < this.board.history.length; ++i) {
      let move = this.board.history[i];
      let notationElem = document.createElement("div");
      notationElem.innerHTML = `${i + 1}.${move.getNotation()}`;
      historyElem.appendChild(notationElem);
    }
    this.elem.appendChild(historyElem);
  }
}
