import { Piece } from "./piece";
import { Board } from "./board";
import { Move } from "./move";

export class Rook extends Piece {
  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    row: number,
    col: number
  ) {
    super(Piece.TYPE.ROOK, side, board, row, col);
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let i = 1; i < 8; ++i) {
      let x = this.col + i;
      if (x > 7) break;
      let piece = this.board.getPieceAt(this.row, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, this.getPosition(), [this.row, x], piece));
        }
        break;
      }
      moves.push(new Move(this, this.getPosition(), [this.row, x], piece));
    }
    for (let i = 1; i < 8; ++i) {
      let x = this.col - i;
      if (x < 0) break;
      let piece = this.board.getPieceAt(this.row, x);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, this.getPosition(), [this.row, x], piece));
        }
        break;
      }
      moves.push(new Move(this, this.getPosition(), [this.row, x], piece));
    }
    for (let i = 1; i < 8; ++i) {
      let y = this.row + i;
      if (y > 7) break;
      let piece = this.board.getPieceAt(y, this.col);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, this.getPosition(), [y, this.col], piece));
        }
        break;
      }
      moves.push(new Move(this, this.getPosition(), [y, this.col], piece));
    }
    for (let i = 1; i < 8; ++i) {
      let y = this.row - i;
      if (y < 0) break;
      let piece = this.board.getPieceAt(y, this.col);
      if (piece !== null) {
        if (piece.side !== this.side) {
          moves.push(new Move(this, this.getPosition(), [y, this.col], piece));
        }
        break;
      }
      moves.push(new Move(this, this.getPosition(), [y, this.col], piece));
    }
    return moves;
  }
}
