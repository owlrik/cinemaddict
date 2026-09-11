import { createElement } from '../render.js';

const createFilmShowMoreTemplate = () =>
  `
    <button class="films-list__show-more">Show more</button>
  `;

class FilmShowMoreView {
  #element = null;

  get template() {
    return createFilmShowMoreTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

export default FilmShowMoreView;
