import { createFilmCardInfoTemplate } from './film-card-info-template.js';
import { createFilmCardControlsTemplate } from './film-card-controls-template.js';

import { createElement } from '../render.js';

const createFilmCardTemplate = () =>
  `
    <article class="film-card">
      ${createFilmCardInfoTemplate()}
      ${createFilmCardControlsTemplate()}
    </article>
  `;

class FilmCardView {
  getTemplate() {
    return createFilmCardTemplate();
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

export default FilmCardView;
