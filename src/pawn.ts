import { Piece } from "./piece";
import { Board } from "./board";
import { Move } from "./move";
import { Queen } from "./queen";
import { Knight } from "./knight";
import { Rook } from "./rook";
import { Bishop } from "./bishop";

export class Pawn extends Piece {
  isMoved: boolean;

  constructor(
    side: (typeof Piece.SIDES)[keyof typeof Piece.SIDES],
    board: Board,
    row: number,
    col: number
  ) {
    super(Piece.TYPE.PAWN, side, board, row, col);
    this.isMoved = false;
  }

  override getMoves(): Move[] {
    let moves: Move[] = [];
    for (let i = 1; i <= (this.isMoved ? 1 : 2); ++i) {
      let di = this.side === Piece.SIDES.BLACK ? i : -i;
      let y = this.row + di;
      if (y >= 0 && y <= 7) {
        let piece = this.board.getPieceAt(y, this.col);
        if (piece === null) {
          let move = new Move(this, this.getPosition(), [y, this.col], piece);
          move.isPromotion = this.isPromoted(y);
          moves.push(move);
        } else break;
      }
    }

    // capture moves
    let di = this.side === Piece.SIDES.BLACK ? 1 : -1;
    for (let dj of [-1, 1]) {
      let y = this.row + di;
      let x = this.col + dj;
      if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        let piece = this.board.getPieceAt(y, x);
        if (piece !== null && piece.side !== this.side) {
          let move = new Move(this, this.getPosition(), [y, x], piece);
          move.isPromotion = this.isPromoted(y);
          moves.push(move);
        }
      }
    }

    return moves;
  }

  isPromoted(row: number = this.row): boolean {
    return (
      (this.side === Piece.SIDES.BLACK && row === 7) ||
      (this.side === Piece.SIDES.WHITE && row == 0)
    );
  }

  promoteTo(type: (typeof Piece.TYPE)[keyof typeof Piece.TYPE]) {
    let promoPiece;
    switch (type) {
      case Piece.TYPE.QUEEN:
        promoPiece = new Queen(this.side, this.board, this.row, this.col);
        break;
      case Piece.TYPE.KNIGHT:
        promoPiece = new Knight(this.side, this.board, this.row, this.col);
        break;
      case Piece.TYPE.ROOK:
        promoPiece = new Rook(this.side, this.board, this.row, this.col);
        break;
      case Piece.TYPE.BISHOP:
        promoPiece = new Bishop(this.side, this.board, this.row, this.col);
        break;
      default:
        console.error("promotion piece type is invalid!");
        return;
    }
    this.isCaptured = true;
    promoPiece!.isMoved = true;
    this.board.board[this.row][this.col] = promoPiece!;
    this.board.isolated = false;
    this.board.game.drawBoard();
    this.board.game.reverseTurn();
  }
}
