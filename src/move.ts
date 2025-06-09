import { Knight } from "./knight";
import { Pawn } from "./pawn";
import { Piece } from "./piece";

export class Move {
  piece: Piece;
  col: number;
  row: number;
  square: Piece | null;
  isCastle: boolean;
  isCheck: boolean;
  isPromotion: boolean;

  constructor(
    piece: Piece,
    row: number,
    col: number,
    square: Piece | null,
    isCastle = false,
    isCheck = false,
    isPromotion = false
  ) {
    this.piece = piece;
    this.row = row;
    this.col = col;
    this.square = square;
    this.isCastle = isCastle;
    this.isCheck = isCheck;
    this.isPromotion = isPromotion;
  }

  getNotation(): string {
    if (this.isCastle) {
      if (this.col === 6) {
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

    if (this.square !== null) {
      if (this.piece instanceof Pawn) {
        notation += String.fromCharCode(97 + this.piece.col);
      }
      notation += "x";
    }

    notation += String.fromCharCode(97 + this.col);
    notation += 8 - this.row;

    if (this.isCheck) {
      notation += "+";
    }

    return notation;
  }
}
