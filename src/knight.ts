import { Piece } from "./piece";
import { Board } from "./board";
import { Move } from "./move";

export class Knight extends Piece {
  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    row: number,
    col: number
  ) {
    super(Piece.TYPE.KNIGHT, side, board, row, col);
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let di of [-2, 2]) {
      for (let dj of [-1, 1]) {
        let y = this.row + di;
        let x = this.col + dj;
        if (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
          let piece = this.board.getPieceAt(y, x);
          if (piece?.side !== this.side) {
            moves.push(new Move(this, this.getPosition(), [y, x], piece));
          }
        }
      }
    }
    for (let di of [-1, 1]) {
      for (let dj of [-2, 2]) {
        let y = this.row + di;
        let x = this.col + dj;
        if (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
          let piece = this.board.getPieceAt(y, x);
          if (piece?.side !== this.side) {
            moves.push(new Move(this, this.getPosition(), [y, x], piece));
          }
        }
      }
    }
    return moves;
  }
}
