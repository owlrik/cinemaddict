import { render, replace, remove } from '../framework/render.js';

import FilmDetailsView from '../view/film-details-view.js';

class FilmDetailsPresenter {
  #container = null;

  #filmDetailsComponent = null;

  #film = null;
  #comments = null;

  #closeButtonClickHandler = null;
  #escKeyDownHandler = null;
  #filmChangeHandler = null;

  constructor(container, closeButtonClickHandler, escKeyDownHandler, filmChangeHandler) {
    this.#container = container;
    this.#closeButtonClickHandler = closeButtonClickHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
    this.#filmChangeHandler = filmChangeHandler;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    this.#filmDetailsComponent.setCloseButtonClickHandler(() => {
      this.#closeButtonClickHandler();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });
    this.#filmDetailsComponent.setWatchlistButtonClickHandler(this.#watchlistButtonClickHandler);
    this.#filmDetailsComponent.setWatchedButtonClickHandler(this.#watchedButtonClickHandler);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#favoriteButtonClickHandler);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    remove(prevFilmDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
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

export default FilmDetailsPresenter;
