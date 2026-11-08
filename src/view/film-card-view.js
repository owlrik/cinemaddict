import AbstractView from '../framework/view/abstract-view.js';

import { createFilmCardInfoTemplate } from './film-card-info-template.js';
import { createFilmCardControlsTemplate } from './film-card-controls-template.js';

const createFilmCardTemplate = ({ filmInfo, comments, userDetails }) =>
  `
    <article class="film-card">
      ${createFilmCardInfoTemplate(filmInfo, comments.length)}
      ${createFilmCardControlsTemplate(userDetails)}
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

  setWatchlistButtonClickHandler = (callback) => {
    this._callback.watchlistButtonClick = callback;

    const watchlistButtonElement = this.element.querySelector('.film-card__controls-item--add-to-watchlist');

    watchlistButtonElement.addEventListener('click', this.#watchlistButtonClickHandler);
  };

  setWatchedButtonClickHandler = (callback) => {
    this._callback.watchedButtonClick = callback;

    const watchedButtonElement = this.element.querySelector('.film-card__controls-item--mark-as-watched');

    watchedButtonElement.addEventListener('click', this.#watchedButtonClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteButtonClick = callback;

    const favoriteButtonElement = this.element.querySelector('.film-card__controls-item--favorite');

    favoriteButtonElement.addEventListener('click', this.#favoriteButtonClickHandler);
  };

  #cardClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.cardClick();
  };

  #watchlistButtonClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.watchlistButtonClick();
  };

  #watchedButtonClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.watchedButtonClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.favoriteButtonClick();
  };
}

export default FilmCardView;
