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

  setCardClickHandler = (callback) => {
    this._callback.cardClick = callback;

    const filmCardLinkElement = this.element.querySelector('.film-card__link');

    filmCardLinkElement.addEventListener('click', this.#cardClickHandler);
  };

  #cardClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.cardClick();
  };
}

export default FilmCardView;
