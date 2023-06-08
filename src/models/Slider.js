import { Pagination } from "./Pagination.js";
import { StyleHelper } from "./StyleHelper.js";

export class Slider {
  constructor(prevButtonElement, nextButtonElement, slideListElement, slideItemCount) {
    this.slideListElement = slideListElement;
    this.prevButtonElement = prevButtonElement;
    this.nextButtonElement = nextButtonElement;

    this.sliderPage = new Pagination(slideListElement.childElementCount, slideItemCount);
    this.styleHelper = new StyleHelper();
  }

  connect() {
    this.setButtonDisplay();
    this.prevButtonElement.addEventListener("click", this.prevPage.bind(this));
    this.nextButtonElement.addEventListener("click", this.nextPage.bind(this));
  }

  setButtonDisplay() {
    this.styleHelper.toggle(this.prevButtonElement, "display", "none", this.sliderPage.isFirstPage());
    this.styleHelper.toggle(this.nextButtonElement, "display", "none", this.sliderPage.isLastPage());
  }

  prevPage() {
    this.sliderPage.prevPage();
    this.updateSlidePosition();
  }

  nextPage() {
    this.sliderPage.nextPage();
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const translatePos = this.sliderPage.currentPage * -(this.slideListElement.clientWidth + 4);

    this.slideListElement.style.transform = `translateX(${translatePos}px)`;
    this.setButtonDisplay();
  }
}
