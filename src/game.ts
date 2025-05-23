import { Board } from "./board.js";
import { Piece } from "./piece.js";

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
  }
}
