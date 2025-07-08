import { Knight } from "./knight";
import { Pawn } from "./pawn";
import { Piece } from "./piece";

interface position {
  row: number;
  col: number;
}

export class Move {
  piece: Piece;
  from: position;
  to: position;
  square: Piece | null;
  isCastle: boolean;
  isCheck: boolean;
  isPromotion: boolean;

  constructor(
    piece: Piece,
    from: [number, number],
    to: [number, number],
    square: Piece | null,
    isCastle = false,
    isCheck = false,
    isPromotion = false
  ) {
    this.piece = piece;
    this.from = { row: from[0], col: from[1] };
    this.to = { row: to[0], col: to[1] };
    this.square = square;
    this.isCastle = isCastle;
    this.isCheck = isCheck;
    this.isPromotion = isPromotion;
  }

  isCapture(): boolean {
    return this.square !== null;
  }

  getNotation(): string {
    if (this.isCastle) {
      if (this.to.col === 6) {
        return "O-O";
      } else return "O-O-O";
    }

    let notation = "";

    let symbol = this.piece.type[0];
    if (this.piece instanceof Knight) {
      symbol = "N";
    } else if (this.piece instanceof Pawn) {
      symbol = "";
    }
    notation += symbol;

    if (this.isCapture()) {
      if (this.piece instanceof Pawn) {
        notation += String.fromCharCode(97 + this.from.col);
      }
      notation += "x";
    }

    notation += String.fromCharCode(97 + this.to.col);
    notation += 8 - this.to.row;

    if (this.isCheck) {
      notation += "+";
    }

    return notation;
  }
}
