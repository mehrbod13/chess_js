import { Piece } from "./piece";
import { Board } from "./board";
import { Move } from "./move";

export class Bishop extends Piece {
  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    col: number,
    row: number
  ) {
    super(Piece.TYPE.BISHOP, side, board, col, row);
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let i = 1; i < 8; ++i) {
      let y = this.col + i;
      let x = this.row + i;
      if (y > 7 || x > 7) break;
      let piece = this.board.getSquare(y, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, y, x, piece));
        }
        break;
      }
      moves.push(new Move(this, y, x, piece));
    }
    for (let i = 1; i < 8; ++i) {
      let y = this.col - i;
      let x = this.row - i;
      if (y < 0 || x < 0) break;
      let piece = this.board.getSquare(y, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, y, x, piece));
        }
        break;
      }
      moves.push(new Move(this, y, x, piece));
    }
    for (let i = 1; i < 8; ++i) {
      let y = this.col - i;
      let x = this.row + i;
      if (y < 0 || x > 7) break;
      let piece = this.board.getSquare(y, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, y, x, piece));
        }
        break;
      }
      moves.push(new Move(this, y, x, piece));
    }
    for (let i = 1; i < 8; ++i) {
      let y = this.col + i;
      let x = this.row - i;
      if (y > 7 || x < 0) break;
      let piece = this.board.getSquare(y, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, y, x, piece));
        }
        break;
      }
      moves.push(new Move(this, y, x, piece));
    }
    return moves;
  }
}
