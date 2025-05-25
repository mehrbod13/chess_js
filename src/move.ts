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

  constructor(
    piece: Piece,
    col: number,
    row: number,
    square: Piece | null,
    isCastle = false,
    isCheck = false
  ) {
    this.piece = piece;
    this.col = col;
    this.row = row;
    this.square = square;
    this.isCastle = isCastle;
    this.isCheck = isCheck;
  }

  getNotation(): string {
    if (this.isCastle) {
      if (this.row === 6) {
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
        notation += String.fromCharCode(97 + this.piece.row);
      }
      notation += "x";
    }

    notation += String.fromCharCode(97 + this.row);
    notation += 8 - this.col;

    if (this.isCheck) {
      notation += "+";
    }

    return notation;
  }
}
