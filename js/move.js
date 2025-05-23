export class Move {
    constructor(piece, col, row, square, isCastle = false) {
        this.piece = piece;
        this.col = col;
        this.row = row;
        this.square = square;
        this.isCastle = isCastle;
    }
}
