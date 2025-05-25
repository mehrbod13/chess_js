import { Piece } from "./piece";
import { Board } from "./board";
import { Move } from "./move";

export class Pawn extends Piece {
  isMoved: boolean;

  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    col: number,
    row: number
  ) {
    super(Piece.TYPE.PAWN, side, board, col, row);
    this.isMoved = false;
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let i = 1; i <= (this.isMoved ? 1 : 2); ++i) {
      let di = this.side === Piece.SIDES.BLACK ? i : -i;
      let y = this.col + di;
      if (y >= 0 && y <= 7) {
        let piece = this.board.getSquare(y, this.row);
        if (piece === null) {
          moves.push(new Move(this, y, this.row, piece));
        } else break;
      }
    }

    // capture moves
    let di = this.side === Piece.SIDES.BLACK ? 1 : -1;
    for (let dj of [-1, 1]) {
      let y = this.col + di;
      let x = this.row + dj;
      if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        let piece = this.board.getSquare(y, x);
        if (piece !== null && piece.side !== this.side) {
          moves.push(new Move(this, y, x, piece));
        }
      }
    }

    return moves;
  }
}
