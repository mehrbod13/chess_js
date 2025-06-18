import { Piece } from "./piece";
import { Board } from "./board";
import { Move } from "./move";
import { Rook } from "./rook";

export class King extends Piece {
  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    row: number,
    col: number
  ) {
    super(Piece.TYPE.KING, side, board, row, col);
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let di = -1; di <= 1; ++di) {
      for (let dj = -1; dj <= 1; ++dj) {
        // ignore king square
        if (di === 0 && dj === 0) continue;

        let y = this.row + di;
        let x = this.col + dj;
        if (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
          let piece = this.board.getPieceAt(y, x);
          if (piece !== null && piece.side === this.side) {
            continue;
          }

          moves.push(new Move(this, this.getPosition(), [y, x], piece));
        }
      }
    }

    if (!this.isChecked().length) {
      // right castle
      if (!this.isMoved) {
        let isEmpty = true;
        for (let i = 1; i <= 2; ++i) {
          let piece = this.board.getPieceAt(this.row, this.col + i);
          if (piece !== null) {
            isEmpty = false;
            break;
          }
        }

        let rook = this.board.getPieceAt(this.row, this.col + 3);
        if (isEmpty && rook && rook instanceof Rook && !rook.isMoved) {
          moves.push(
            new Move(
              this,
              this.getPosition(),
              [this.row, this.col + 2],
              rook,
              true
            )
          );
        }
      }

      // left castle
      if (!this.isMoved) {
        let isEmpty = true;
        for (let i = 1; i <= 3; ++i) {
          let piece = this.board.getPieceAt(this.row, this.col - i);
          if (piece !== null) {
            isEmpty = false;
            break;
          }
        }

        let rook = this.board.getPieceAt(this.row, this.col - 4);
        if (isEmpty && rook && rook instanceof Rook && !rook.isMoved) {
          moves.push(
            new Move(
              this,
              this.getPosition(),
              [this.row, this.col - 2],
              rook,
              true
            )
          );
        }
      }
    }

    return moves;
  }

  isChecked(): Piece[] {
    let pieces = [];
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        let piece = this.board.getPieceAt(i, j);
        if (piece && piece.side !== this.side && !(piece instanceof King)) {
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
