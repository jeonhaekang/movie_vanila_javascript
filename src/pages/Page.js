export class Page {
  constructor(content, cache = {}) {
    this.renderContent = content;
    this.cache = cache;
    this.rootElement = document.querySelector("#root");
  }

  async before() {}

  async after() {}

  async render(queryString) {
    this.rootElement.innerHTML = this.renderContent;

    await this.before(queryString);
    await this.after(queryString);
  }
}
