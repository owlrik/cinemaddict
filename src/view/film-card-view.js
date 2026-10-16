import AbstractView from '../framework/view/abstract-view.js';

import { createFilmCardInfoTemplate } from './film-card-info-template.js';
import { createFilmCardControlsTemplate } from './film-card-controls-template.js';

const createFilmCardTemplate = ({ filmInfo, comments }) =>
  `
    <article class="film-card">
      ${createFilmCardInfoTemplate(filmInfo, comments.length)}
      ${createFilmCardControlsTemplate()}
    </article>
  `;

class FilmCardView extends AbstractView {
  #film = null;

  constructor({ film }) {
    super();

    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}

export default FilmCardView;
