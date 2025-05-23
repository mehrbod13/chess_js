import { Piece } from "./piece.js";

export class Move {
  piece: Piece;
  col: number;
  row: number;
  square: Piece | null;
  isCastle: boolean;

  constructor(
    piece: Piece,
    col: number,
    row: number,
    square: Piece | null,
    isCastle = false
  ) {
    this.piece = piece;
    this.col = col;
    this.row = row;
    this.square = square;
    this.isCastle = isCastle;
  }
}
