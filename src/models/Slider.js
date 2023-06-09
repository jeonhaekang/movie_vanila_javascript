import { Pagination } from "./Pagination.js";
import { StyleHelper } from "./StyleHelper.js";

export class Slider {
  constructor(prevButtonElement, nextButtonElement, slideListElement, slideItemCount) {
    this._slideListElement = slideListElement;
    this._prevButtonElement = prevButtonElement;
    this._nextButtonElement = nextButtonElement;

    this._sliderPage = new Pagination(slideListElement.childElementCount, slideItemCount);
    this._styleHelper = new StyleHelper();
  }

  get sliderPage() {
    return this._sliderPage;
  }

  set sliderPage(newPage) {
    this._sliderPage = newPage;
    this.updateSlidePosition();
    this.setButtonDisplay();
  }

  connect() {
    this.setButtonDisplay();
    this._prevButtonElement.addEventListener("click", this.prevPage.bind(this));
    this._nextButtonElement.addEventListener("click", this.nextPage.bind(this));
  }

  setButtonDisplay() {
    this._styleHelper.toggle(this._prevButtonElement, "display", "none", this.sliderPage.isFirstPage());
    this._styleHelper.toggle(this._nextButtonElement, "display", "none", this.sliderPage.isLastPage());
  }

  prevPage() {
    this.sliderPage.currentPage = this.sliderPage.currentPage - 1;
  }

  nextPage() {
    this.sliderPage.currentPage = this.sliderPage.currentPage + 1;
  }

  updateSlidePosition() {
    const gap = parseInt(getComputedStyle(this._slideListElement)["gap"]);
    const translatePos = this.sliderPage.currentPage * -(this._slideListElement.clientWidth + gap);

    this._slideListElement.style.transform = `translateX(${translatePos}px)`;
  }
}
