import { createElement } from '../render.js';

const createFooterStatisticsTemplate = () =>
  `
    <p>130 291 movies inside</p>
  `;

class FooterStatisticsView {
  getTemplate() {
    return createFooterStatisticsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export default FooterStatisticsView;
