import { Board } from "./board.js";
import { Move } from "./move.js";

export class Piece {
  static SIDES = {
    BLACK: "Black",
    WHITE: "White",
  } as const;

  static TYPE = {
    PAWN: "Pawn",
    ROOK: "Rook",
    KNIGHT: "Knight",
    BISHOP: "Bishop",
    QUEEN: "Queen",
    KING: "King",
  } as const;

  type: (typeof Piece.TYPE)[keyof typeof Piece.TYPE];
  side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES];
  board: Board;
  col: number;
  row: number;
  elem: Element;
  isMoved: Boolean;

  constructor(
    type: (typeof Piece.TYPE)[keyof typeof Piece.TYPE],
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    col: number,
    row: number
  ) {
    this.type = type;
    this.side = side;
    this.board = board;
    this.col = col;
    this.row = row;
    this.elem = this.getElement();

    // move flag needed for some pieces (pawn,king,rook)
    this.isMoved = false;
  }

  getAssest() {
    return `./assets/${this.type}-${this.side}.svg`;
  }

  getElement() {
    let element = document.createElement("div");
    element.classList.add("piece");
    let image = document.createElement("img");
    image.setAttribute("src", this.getAssest());
    element.appendChild(image);
    return element;
  }

  getMoves(): Move[] {
    return [];
  }

  getValidMoves(): Move[] {
    return this.getMoves().filter(
      (move) => move.square?.type !== Piece.TYPE.KING && this.checkMove(move)
    );
  }

  move(col: number, row: number): boolean {
    for (let move of this.getValidMoves()) {
      if (col === move.col && row === move.row) {
        if (move.isCastle) {
          if (move.row === 6) {
            move.square?.move(move.col, 5);
          } else if (move.row === 2) {
            move.square?.move(move.col, 3);
          }
        }

        this.board.board[this.col][this.row] = null;
        this.board.board[col][row] = this;
        this.col = col;
        this.row = row;

        return true;
      }
    }
    return false;
  }

  // check if move cause king check or dont remove it
  checkMove(move: Move): Boolean {
    let king =
      this.side === Piece.SIDES.WHITE
        ? this.board.whiteKing
        : this.board.blackKing;

    this.board.board[this.col][this.row] = null;
    let chache = this.board.board[move.col][move.row];
    this.board.board[move.col][move.row] = this;

    let res = king.isChecked().length === 0;
    this.board.board[this.col][this.row] = this;
    this.board.board[move.col][move.row] = chache;
    return res;
  }
}
