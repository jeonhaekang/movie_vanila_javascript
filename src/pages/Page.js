export class Page {
  constructor(content, cache = {}) {
    this.renderContent = content;
    this.cache = cache;
    this.rootElement = document.querySelector("#root");

    window.addEventListener("history", this.caching.bind(this));
  }

  async fetchData() {}

  async render(withCache = false) {
    const cacheData = this.cache[location.pathname];

    if (withCache && cacheData) {
      this.rootElement.innerHTML = cacheData;
    } else {
      this.rootElement.innerHTML = this.renderContent;

      await this.fetchData();
    }
  }

  caching() {
    this.cache[location.pathname] = this.rootElement.innerHTML;
  }
}
