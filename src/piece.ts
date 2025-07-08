import { Board } from "./board";
import { Move } from "./move";
import { promotionMenu } from "./promotionMenu";

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

  static getPoint(type: (typeof Piece.TYPE)[keyof typeof Piece.TYPE]): number {
    switch (type) {
      case Piece.TYPE.PAWN:
        return 1;
      case Piece.TYPE.BISHOP:
      case Piece.TYPE.KNIGHT:
        return 3;
      case Piece.TYPE.ROOK:
        return 5;
      case Piece.TYPE.QUEEN:
        return 9;
      default:
        return 0;
    }
  }

  static getAsset(
    type: (typeof Piece.TYPE)[keyof typeof Piece.TYPE],
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES]
  ): string {
    return `./assets/${type}-${side}.svg`;
  }

  type: (typeof Piece.TYPE)[keyof typeof Piece.TYPE];
  side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES];
  board: Board;
  col: number;
  row: number;
  elem: Element;
  isMoved: Boolean;
  isCaptured: Boolean;

  constructor(
    type: (typeof Piece.TYPE)[keyof typeof Piece.TYPE],
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    row: number,
    col: number
  ) {
    this.type = type;
    this.side = side;
    this.board = board;
    this.row = row;
    this.col = col;
    this.elem = this.getElement();
    this.registerHandler();

    // move flag needed for some pieces (pawn,king,rook)
    this.isMoved = false;

    // if piece go out of board this flag will be true
    this.isCaptured = false;

    this.board.game.pieces[this.side].push(this);
  }

  getPosition(): [number, number] {
    return [this.row, this.col];
  }

  getElement() {
    let element = document.createElement("div");
    element.classList.add("piece");
    let image = document.createElement("img");
    image.setAttribute("src", Piece.getAsset(this.type, this.side));
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

  move(row: number, col: number): boolean {
    for (let move of this.getValidMoves()) {
      if (col === move.to.col && row === move.to.row) {
        // move rook if castle
        if (move.isCastle) {
          if (move.to.col === 6) {
            move.square?.move(move.to.row, 5);
          } else if (move.to.col === 2) {
            move.square?.move(move.to.row, 3);
          }
        }

        this.board.board[this.row][this.col] = null;
        this.board.board[row][col] = this;
        this.col = col;
        this.row = row;

        // pawn promotion
        if (this.type === Piece.TYPE.PAWN && move.isPromotion) {
          let promo = new promotionMenu(this);
          this.elem.appendChild(promo.getElement());
          this.board.isolated = true;
        }

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

    this.board.board[this.row][this.col] = null;
    let cache = this.board.board[move.to.row][move.to.col];
    this.board.board[move.to.row][move.to.col] = this;

    let res = king.isChecked().length === 0;
    this.board.board[this.row][this.col] = this;
    this.board.board[move.to.row][move.to.col] = cache;
    return res;
  }

  registerHandler() {
    this.elem.addEventListener("click", () => {
      this.board.selectPiece(this);
    });
  }
}
