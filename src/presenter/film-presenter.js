import { render, replace, remove } from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';

class FilmPresenter {
  #container = null;

  #filmCardComponent = null;

  #film = null;

  #clickCardHandler = null;
  #escKeyDownHandler = null;

  constructor(container, clickCardHandler, escKeyDownHandler) {
    this.#container = container;
    this.#clickCardHandler = clickCardHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView({film: this.#film});

    this.#filmCardComponent.setCardClickHandler(() => {
      this.#clickCardHandler(this.#film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });

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
}

export default FilmPresenter;
