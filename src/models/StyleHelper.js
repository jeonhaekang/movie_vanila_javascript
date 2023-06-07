export class StyleHelper {
  constructor() {
    this.styles = new Map();
  }

  save(element, property) {
    const style = getComputedStyle(element)[property];
    this.styles.set(element, { [property]: style });
  }

  restore(element, property) {
    const originStyle = this.styles.get(element);
    if (originStyle && property in originStyle) {
      element.style[property] = originStyle[property];
    }
  }

  toggle(element, property, value, trigger) {
    if (trigger) {
      this.save(element, property);
      element.style[property] = value;
    } else {
      this.restore(element, property);
    }
  }
}
