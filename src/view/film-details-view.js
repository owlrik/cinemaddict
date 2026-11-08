import AbstractView from '../framework/view/abstract-view.js';

import { createFilmDetailsInfoTemplate } from './film-details-info-template.js';
import { createFilmDetailsControlsTemplate } from './film-details-controls-template.js';
import { createFilmDetailsCommentsTemplate } from './film-details-comments-template.js';
import { createFilmDetailsFormTemplate } from './film-details-form-template.js';

const createFilmDetailsTemplate = ({ filmInfo, userDetails }, comments) =>
  `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          ${createFilmDetailsInfoTemplate(filmInfo)}

          ${createFilmDetailsControlsTemplate(userDetails)}
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            ${createFilmDetailsCommentsTemplate(comments)}

            ${createFilmDetailsFormTemplate()}
          </section>
        </div>
      </div>
    </section>
  `;

class FilmDetailsView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();

    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;

    const filmDetailsCloseButtonElement = this.element.querySelector('.film-details__close-btn');

    filmDetailsCloseButtonElement.addEventListener('click', this.#closeButtonClickHandler);
  };

  setWatchlistButtonClickHandler = (callback) => {
    this._callback.watchlistButtonClick = callback;

    const watchlistButtonElement = this.element.querySelector('.film-details__control-button--watchlist');

    watchlistButtonElement.addEventListener('click', this.#watchlistButtonClickHandler);
  };

  setWatchedButtonClickHandler = (callback) => {
    this._callback.watchedButtonClick = callback;

    const watchedButtonElement = this.element.querySelector('.film-details__control-button--watched');

    watchedButtonElement.addEventListener('click', this.#watchedButtonClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteButtonClick = callback;

    const favoriteButtonElement = this.element.querySelector('.film-details__control-button--favorite');

    favoriteButtonElement.addEventListener('click', this.#favoriteButtonClickHandler);
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.closeButtonClick();
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

export default FilmDetailsView;
