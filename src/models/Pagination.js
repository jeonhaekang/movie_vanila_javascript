export class Pagination {
  constructor(totalCount, pageCount) {
    this.currentPage = 0;
    this.maxPage = Math.ceil(totalCount / pageCount) - 1;
  }

  nextPage() {
    if (this.currentPage < this.maxPage) {
      this.currentPage += 1;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
    }
  }

  isLastPage() {
    return this.currentPage === this.maxPage;
  }

  isFirstPage() {
    return this.currentPage === 0;
  }
}
