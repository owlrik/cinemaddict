import { createElement } from '../render.js';

const createFilmShowMoreTemplate = () =>
  `
    <button class="films-list__show-more">Show more</button>
  `;

class FilmShowMoreView {
  getTemplate() {
    return createFilmShowMoreTemplate();
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

export default FilmShowMoreView;
