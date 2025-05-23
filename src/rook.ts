import { Piece } from "./piece.js";
import { Board } from "./board.js";
import { Move } from "./move.js";

export class Rook extends Piece {
  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    col: number,
    row: number
  ) {
    super(Piece.TYPE.ROOK, side, board, col, row);
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let i = 1; i < 8; ++i) {
      let x = this.row + i;
      if (x > 7) break;
      let piece = this.board.getSquare(this.col, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, this.col, x, piece));
        }
        break;
      }
      moves.push(new Move(this, this.col, x, piece));
    }
    for (let i = 1; i < 8; ++i) {
      let x = this.row - i;
      if (x < 0) break;
      let piece = this.board.getSquare(this.col, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, this.col, x, piece));
        }
        break;
      }
      moves.push(new Move(this, this.col, x, piece));
    }
    for (let i = 1; i < 8; ++i) {
      let y = this.col + i;
      if (y > 7) break;
      let piece = this.board.getSquare(y, this.row);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, y, this.row, piece));
        }
        break;
      }
      moves.push(new Move(this, y, this.row, piece));
    }
    for (let i = 1; i < 8; ++i) {
      let y = this.col - i;
      if (y < 0) break;
      let piece = this.board.getSquare(y, this.row);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, y, this.row, piece));
        }
        break;
      }
      moves.push(new Move(this, y, this.row, piece));
    }
    return moves;
  }
}
