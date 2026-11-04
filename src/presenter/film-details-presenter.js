import { render } from '../framework/render.js';

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

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    this.#filmDetailsComponent.setCloseButtonClickHandler(() => {
      this.#closeButtonClickHandler();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });

    render(this.#filmDetailsComponent, this.#container);
  };
}

export default FilmDetailsPresenter;
