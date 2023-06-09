export class Pagination {
  constructor(totalCount, pageCount) {
    this._currentPage = 0;
    this._maxPage = Math.ceil(totalCount / pageCount) - 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page) {
    if (page >= 0 && page <= this._maxPage) {
      this._currentPage = page;
    }
  }

  nextPage() {
    this.currentPage = this._currentPage + 1;
  }

  prevPage() {
    this.currentPage = this._currentPage - 1;
  }

  isLastPage() {
    return this._currentPage === this._maxPage;
  }

  isFirstPage() {
    return this._currentPage === 0;
  }
}
