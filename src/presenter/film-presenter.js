import { render, replace, remove } from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';

class FilmPresenter {
  #container = null;

  #filmCardComponent = null;

  #film = null;

  #filmChangeHandler = null;
  #clickCardHandler = null;
  #escKeyDownHandler = null;

  constructor({ container, onDataChange, onShowDetails, onEscKeyDown }) {
    this.#container = container;
    this.#filmChangeHandler = onDataChange;
    this.#clickCardHandler = onShowDetails;
    this.#escKeyDownHandler = onEscKeyDown;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView({film: this.#film});

    this.#filmCardComponent.setCardClickHandler(() => {
      this.#clickCardHandler(this.#film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });
    this.#filmCardComponent.setWatchlistButtonClickHandler(this.#watchlistButtonClickHandler);
    this.#filmCardComponent.setWatchedButtonClickHandler(this.#watchedButtonClickHandler);
    this.#filmCardComponent.setFavoriteClickHandler(this.#favoriteButtonClickHandler);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#container);
      return;
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #watchlistButtonClickHandler = () => {
    this.#filmChangeHandler({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      }
    });
  };

  #watchedButtonClickHandler = () => {
    this.#filmChangeHandler({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      }
    });
  };

  #favoriteButtonClickHandler = () => {
    this.#filmChangeHandler({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite
      }
    });
  };
}

export default FilmPresenter;
