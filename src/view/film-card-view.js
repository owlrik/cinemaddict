import { createFilmCardInfoTemplate } from './film-card-info-template.js';
import { createFilmCardControlsTemplate } from './film-card-controls-template.js';

import { createElement } from '../render.js';

const createFilmCardTemplate = ({ filmInfo, comments }) =>
  `
    <article class="film-card">
      ${createFilmCardInfoTemplate(filmInfo, comments.length)}
      ${createFilmCardControlsTemplate()}
    </article>
  `;

class FilmCardView {
  #element = null;

  constructor({ film }) {
    this.film = film;
  }

  get template() {
    return createFilmCardTemplate(this.film);
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

export default FilmCardView;
