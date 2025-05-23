import { Piece } from "./piece.js";
import { Board } from "./board.js";
import { Move } from "./move.js";
import { Rook } from "./rook.js";

export class King extends Piece {
  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    col: number,
    row: number
  ) {
    super(Piece.TYPE.KING, side, board, col, row);
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let di = -1; di <= 1; ++di) {
      for (let dj = -1; dj <= 1; ++dj) {
        // ignore king square
        if (di === 0 && dj === 0) continue;

        let y = this.col + di;
        let x = this.row + dj;
        if (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
          let piece = this.board.getSquare(y, x);
          if (piece !== null && piece.side === this.side) {
            continue;
          }

          moves.push(new Move(this, y, x, piece));
        }
      }
    }

    // right castle
    if (!this.isMoved) {
      let isEmpty = true;
      for (let i = 1; i <= 2; ++i) {
        let piece = this.board.getSquare(this.col, this.row + i);
        if (piece !== null) {
          isEmpty = false;
          break;
        }
      }

      let rook = this.board.getSquare(this.col, this.row + 3);
      if (isEmpty && rook && rook instanceof Rook && !rook.isMoved) {
        moves.push(new Move(this, this.col, this.row + 2, rook, true));
      }
    }

    // left castle
    if (!this.isMoved) {
      let isEmpty = true;
      for (let i = 1; i <= 3; ++i) {
        let piece = this.board.getSquare(this.col, this.row - i);
        if (piece !== null) {
          isEmpty = false;
          break;
        }
      }

      let rook = this.board.getSquare(this.col, this.row - 4);
      if (isEmpty && rook && rook instanceof Rook && !rook.isMoved) {
        moves.push(new Move(this, this.col, this.row - 2, rook, true));
      }
    }

    return moves;
  }

  isChecked(): Piece[] {
    let pieces = [];
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        let piece = this.board.getSquare(i, j);
        if (piece && piece.side !== this.side) {
          for (let move of piece.getMoves()) {
            if (move.square === this) {
              pieces.push(piece);
            }
          }
        }
      }
    }
    return pieces;
  }
}
