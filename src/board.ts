import { Game } from "./game";
import { Piece } from "./piece";
import { King } from "./king";
import { Rook } from "./rook";
import { Knight } from "./knight";
import { Bishop } from "./bishop";
import { Queen } from "./queen";
import { Pawn } from "./pawn";
import { Move } from "./move";
import { startGame } from "./main";

export class Board {
  board: (Piece | null)[][];
  selectedPiece: Piece | null;
  game: Game;
  blackKing: King;
  whiteKing: King;
  history: Move[];
  isolated: boolean;

  constructor(game: Game) {
    this.game = game;
    this.blackKing = new King(Piece.SIDES.BLACK, this, 0, 4);
    this.whiteKing = new King(Piece.SIDES.WHITE, this, 7, 4);
    this.board = this.initBoard();
    this.selectedPiece = null;
    this.history = [];
    this.isolated = false;
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

  getPieceAt(row: number, col: number): Piece | null {
    return this.board[row][col];
  }

  getSquare(row: number, col: number): HTMLElement | null {
    return document.querySelector(`.square:nth-child(${row * 8 + col + 1})`);
  }

  getElement() {
    let flexbox = document.createElement("div");
    flexbox.classList.add("column-flex");

    // show white captured pieces
    let whitePoint = 0;
    let whitecpElem = document.createElement("div");
    whitecpElem.setAttribute("id", "white_cp");
    for (let type of this.game.captures[Piece.SIDES.WHITE]) {
      let cpImg = document.createElement("img");
      cpImg.src = Piece.getAsset(type, Piece.SIDES.WHITE);
      whitecpElem.appendChild(cpImg);
      whitePoint += Piece.getPoint(type);
    }
    flexbox.appendChild(whitecpElem);

    let elem = document.createElement("div");
    elem.classList.add("board");
    let isWhite = true;
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        let piece = this.getPieceAt(i, j);
        if (j !== 0) {
          isWhite = !isWhite;
        }
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add(isWhite ? "white" : "black");

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
            // king check
            if (piece.isChecked().length) {
              piece.elem.classList.add("checked");

              // king checkmate
              if (piece.isCheckmated()) {
                document.getElementById("checkmate__menu")!.style.display =
                  "flex";

                document.querySelector(
                  "#checkmate__menu>.message>.side"
                )!.innerHTML = this.game.turn;

                document
                  .querySelector("#restart_button")!
                  .addEventListener("click", () => {
                    startGame();
                  });
              }
            } else {
              piece.elem.classList.remove("checked");
            }
          }

          square.appendChild(piece.elem);
        }
        elem.appendChild(square);
      }
    }
    flexbox.appendChild(elem);

    // show black captured pieces
    let blackcpElem = document.createElement("div");
    blackcpElem.setAttribute("id", "black_cp");
    let blackPoint = 0;
    for (let type of this.game.captures[Piece.SIDES.BLACK]) {
      let cpImg = document.createElement("img");
      cpImg.src = Piece.getAsset(type, Piece.SIDES.BLACK);
      blackcpElem.appendChild(cpImg);
      blackPoint += Piece.getPoint(type);
    }
    flexbox.appendChild(blackcpElem);

    // show extra point
    if (whitePoint > blackPoint) {
      whitecpElem.innerHTML += `+${whitePoint - blackPoint}`;
    } else if (blackPoint > whitePoint) {
      blackcpElem.innerHTML += `+${blackPoint - whitePoint}`;
    }

    return flexbox;
  }

  selectPiece(piece: Piece) {
    // validate turn
    if (this.game.turn !== piece.side || this.isolated) {
      return;
    }

    // remove prev highlighted squares
    document.querySelectorAll(".highlighted").forEach((elem) => {
      elem.classList.remove("highlighted");
    });

    this.selectedPiece = piece;
    for (let move of piece.getValidMoves()) {
      this.highlightSquare(move.to.row, move.to.col);
      let square = this.getSquare(move.to.row, move.to.col);
      if (square) {
        square?.addEventListener("click", () => this.moveListener(move));
      }
    }
  }

  moveListener(move: Move) {
    if (move.piece === this.selectedPiece) {
      if (this.selectedPiece.move(move.to.row, move.to.col)) {
        for (let target of move.piece.getMoves()) {
          if (target.square instanceof King) {
            move.isCheck = true;
            break;
          }
        }

        if (move.isCapture()) {
          let target: Piece = move.square as Piece;
          target.isCaptured = true;
          this.game.captures[target.side].push(target.type);
        }

        this.history.push(move);
        if (!this.selectedPiece.isMoved) {
          this.selectedPiece.isMoved = true;
        }
        this.selectedPiece = null;
        this.game.drawBoard();

        if (!move.isPromotion) {
          this.game.reverseTurn();
        }
      }
    }
  }

  highlightSquare(row: number, col: number) {
    let square = this.getSquare(row, col);
    square?.classList.add("highlighted");
  }
}
