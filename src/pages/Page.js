export class Page {
  constructor(innerHTML) {
    this.content = innerHTML;
  }

  render() {
    return this.content;
  }
}
