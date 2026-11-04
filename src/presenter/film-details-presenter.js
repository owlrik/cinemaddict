import { render, replace, remove } from '../framework/render.js';

import FilmDetailsView from '../view/film-details-view.js';

class FilmDetailsPresenter {
  #container = null;

  #filmDetailsComponent = null;

  #film = null;
  #comments = null;

  #closeButtonClickHandler = null;
  #escKeyDownHandler = null;

  constructor(container, closeButtonClickHandler, escKeyDownHandler) {
    this.#container = container;
    this.#closeButtonClickHandler = closeButtonClickHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
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
}

export default FilmDetailsPresenter;
