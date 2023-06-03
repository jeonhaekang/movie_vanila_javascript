const cache = {};

export class Page {
  constructor(innerHTML) {
    this.content = innerHTML;

    window.addEventListener("history", this.caching.bind(this));
  }

  render(withCache = false) {
    if (withCache) {
      return cache[location.pathname] || this.content;
    }

    return this.content;
  }

  caching() {
    const rootElement = document.querySelector("#root");

    cache[location.pathname] = rootElement.innerHTML;
  }
}
