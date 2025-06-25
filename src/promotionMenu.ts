import { Pawn } from "./pawn";
import { Piece } from "./piece";

export class promotionMenu {
  options: (typeof Piece.TYPE)[keyof typeof Piece.TYPE][];
  pawn: Pawn;

  constructor(pawn: Piece) {
    this.pawn = pawn as Pawn;
    this.options = [
      Piece.TYPE.QUEEN,
      Piece.TYPE.BISHOP,
      Piece.TYPE.KNIGHT,
      Piece.TYPE.ROOK,
    ];
  }

  getElement(): Element {
    let elem = document.createElement("div");
    elem.classList.add("promo");
    elem.style.top = this.pawn.side === Piece.SIDES.WHITE ? "-130%" : "130%";

    for (let option of this.options) {
      let optionElem = document.createElement("div");
      optionElem.classList.add("option");

      optionElem.addEventListener("click", () => {
        this.pawn.promoteTo(option);
      });

      let optionImg = document.createElement("img");
      optionImg.setAttribute("src", Piece.getAsset(option, this.pawn.side));
      optionElem.appendChild(optionImg);
      elem.appendChild(optionElem);
    }

    return elem;
  }
}
