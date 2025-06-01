import { Game } from "./game";
import { Piece } from "./piece";
import { King } from "./king";
import { Rook } from "./rook";
import { Knight } from "./knight";
import { Bishop } from "./bishop";
import { Queen } from "./queen";
import { Pawn } from "./pawn";
import { Move } from "./move";

export class Board {
  board: (Piece | null)[][];
  selectedPiece: Piece | null;
  game: Game;
  blackKing: King;
  whiteKing: King;
  history: Move[];

  constructor(game: Game) {
    this.blackKing = new King(Piece.SIDES.BLACK, this, 0, 4);
    this.whiteKing = new King(Piece.SIDES.WHITE, this, 7, 4);
    this.board = this.initBoard();
    this.selectedPiece = null;
    this.game = game;
    this.history = [];
  }

  initBoard(): Piece[][] {
    return [
      [
        new Rook(Piece.SIDES.BLACK, this, 0, 0),
        new Knight(Piece.SIDES.BLACK, this, 0, 1),
        new Bishop(Piece.SIDES.BLACK, this, 0, 2),
        new Queen(Piece.SIDES.BLACK, this, 0, 3),
        this.blackKing,
        new Bishop(Piece.SIDES.BLACK, this, 0, 5),
        new Knight(Piece.SIDES.BLACK, this, 0, 6),
        new Rook(Piece.SIDES.BLACK, this, 0, 7),
      ],
      [
        new Pawn(Piece.SIDES.BLACK, this, 1, 0),
        new Pawn(Piece.SIDES.BLACK, this, 1, 1),
        new Pawn(Piece.SIDES.BLACK, this, 1, 2),
        new Pawn(Piece.SIDES.BLACK, this, 1, 3),
        new Pawn(Piece.SIDES.BLACK, this, 1, 4),
        new Pawn(Piece.SIDES.BLACK, this, 1, 5),
        new Pawn(Piece.SIDES.BLACK, this, 1, 6),
        new Pawn(Piece.SIDES.BLACK, this, 1, 7),
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Pawn(Piece.SIDES.WHITE, this, 6, 0),
        new Pawn(Piece.SIDES.WHITE, this, 6, 1),
        new Pawn(Piece.SIDES.WHITE, this, 6, 2),
        new Pawn(Piece.SIDES.WHITE, this, 6, 3),
        new Pawn(Piece.SIDES.WHITE, this, 6, 4),
        new Pawn(Piece.SIDES.WHITE, this, 6, 5),
        new Pawn(Piece.SIDES.WHITE, this, 6, 6),
        new Pawn(Piece.SIDES.WHITE, this, 6, 7),
      ],
      [
        new Rook(Piece.SIDES.WHITE, this, 7, 0),
        new Knight(Piece.SIDES.WHITE, this, 7, 1),
        new Bishop(Piece.SIDES.WHITE, this, 7, 2),
        new Queen(Piece.SIDES.WHITE, this, 7, 3),
        this.whiteKing,
        new Bishop(Piece.SIDES.WHITE, this, 7, 5),
        new Knight(Piece.SIDES.WHITE, this, 7, 6),
        new Rook(Piece.SIDES.WHITE, this, 7, 7),
      ],
    ] as Piece[][];
  }

  registerHandlers() {
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        let piece = this.getSquare(i, j);
        if (piece !== null) {
          piece.elem.addEventListener("click", () => {
            this.selectPiece(piece);
          });
        }
      }
    }
  }

  getSquare(col: number, row: number): Piece | null {
    return this.board[col][row];
  }

  getElement() {
    let elem = document.createElement("div");
    elem.classList.add("board");
    let isWhite = true;
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        let piece = this.getSquare(i, j);
        if (j !== 0) {
          isWhite = !isWhite;
        }
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.backgroundColor = isWhite
          ? "var(--white-square)"
          : "var(--black-square)";

        // draw icons
        if (j == 0) {
          let before = document.createElement("div");
          before.classList.add("number-icon");
          before.innerHTML = `${8 - i}`;
          before.style.color = isWhite
            ? "var(--black-square)"
            : "var(--white-square)";
          square.appendChild(before);
        }
        if (i == 7) {
          let before = document.createElement("div");
          before.classList.add("char-icon");
          before.innerHTML = `${String.fromCharCode(97 + j)}`;
          before.style.color = isWhite
            ? "var(--black-square)"
            : "var(--white-square)";
          square.appendChild(before);
        }

        if (piece !== null) {
          if (piece instanceof King) {
            if (piece.isChecked().length) {
              piece.elem.classList.add("checked");
            } else {
              piece.elem.classList.remove("checked");
            }
          }
          square.appendChild(piece.elem);
        }
        elem.appendChild(square);
      }
    }
    return elem;
  }

  selectPiece(piece: Piece) {
    // validate turn
    if (this.game.turn !== piece.side) {
      return;
    }

    // remove prev highlighted squares
    document.querySelectorAll(".highlighted").forEach((elem) => {
      elem.classList.remove("highlighted");
    });

    this.selectedPiece = piece;
    for (let move of piece.getValidMoves()) {
      this.highlightSquare(move.col, move.row);
      let square = document.querySelector(
        `.square:nth-child(${move.col * 8 + move.row + 1})`
      );
      if (square) {
        square?.addEventListener("click", () => this.moveListener(move));
      }
    }
  }

  moveListener(move: Move) {
    if (this.selectedPiece !== null) {
      if (this.selectedPiece.move(move.col, move.row)) {
        for (let target of move.piece.getMoves()) {
          if (target.square instanceof King) {
            move.isCheck = true;
            break;
          }
        }

        this.history.push(move);
        if (!this.selectedPiece.isMoved) {
          this.selectedPiece.isMoved = true;
        }
        this.selectedPiece = null;
        this.game.drawBoard();
        this.game.reverseTurn();
      }
    }
  }

  highlightSquare(col: number, row: number) {
    let square = document.querySelector(
      `.square:nth-child(${col * 8 + row + 1})`
    );
    square?.classList.add("highlighted");
  }
}
