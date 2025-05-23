import { Piece } from "./piece.js";
import { Move } from "./move.js";
export class Pawn extends Piece {
    constructor(side, board, col, row) {
        super(Piece.TYPE.PAWN, side, board, col, row);
        this.isMoved = false;
    }
    getMoves() {
        let moves = [];
        for (let i = 1; i <= (this.isMoved ? 1 : 2); ++i) {
            let di = this.side === Piece.SIDES.BLACK ? i : -i;
            let y = this.col + di;
            if (y >= 0 && y <= 7) {
                let piece = this.board.getSquare(y, this.row);
                if (piece === null) {
                    moves.push(new Move(this, y, this.row, piece));
                }
                else
                    break;
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
