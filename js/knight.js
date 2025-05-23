import { Piece } from "./piece.js";
import { Move } from "./move.js";
export class Knight extends Piece {
    constructor(side, board, col, row) {
        super(Piece.TYPE.KNIGHT, side, board, col, row);
    }
    getMoves() {
        let moves = [];
        for (let di of [-2, 2]) {
            for (let dj of [-1, 1]) {
                let y = this.col + di;
                let x = this.row + dj;
                if (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
                    let piece = this.board.getSquare(y, x);
                    if ((piece === null || piece === void 0 ? void 0 : piece.side) !== this.side) {
                        moves.push(new Move(this, y, x, piece));
                    }
                }
            }
        }
        for (let di of [-1, 1]) {
            for (let dj of [-2, 2]) {
                let y = this.col + di;
                let x = this.row + dj;
                if (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
                    let piece = this.board.getSquare(y, x);
                    if ((piece === null || piece === void 0 ? void 0 : piece.side) !== this.side) {
                        moves.push(new Move(this, y, x, piece));
                    }
                }
            }
        }
        return moves;
    }
}
