import { render, remove } from '../framework/render.js';

import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { FILM_COUNT_STEP } from '../const.js';

import { isEscapeKey } from '../utils/common.js';

class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmListView();
  #filmsListContainerComponent = new FilmListContainerView();
  #filmShowMoreComponent = new FilmShowMoreView();
  #filmDetailsComponent = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_STEP;

  constructor({ filmsContainer, filmsModel, commentsModel }) {
    this.#container = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];

    this.#renderFilmBoard();
  };

  #renderFilmBoard = () => {
    if (this.#films.length === 0) {
      render(new FilmListEmptyView(), this.#container);
      return;
    }

    render(new SortView(), this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#films
      .slice(0, Math.min(this.#films.length, FILM_COUNT_STEP))
      .forEach((film) => this.#renderFilm(film, this.#filmsListContainerComponent));

    if (this.#films.length > FILM_COUNT_STEP) {
      this.#addFilmShowMoreComponent();
    }
  };

  #renderFilm = (film, container) => {
    const filmCardComponent = new FilmCardView({film});

    filmCardComponent.setCardClickHandler(() => {
      this.#addFilmDetailsComponent(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(filmCardComponent, container.element);
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.filmComments = film;
    const comments = [...this.#commentsModel.filmComments];
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);

    this.#filmDetailsComponent.setCloseButtonClickHandler(() => {
      this.#removeFilmDetailsComponent();
      document.removeEventListener('click', this.#onEscKeyDown);
    });

    render(this.#filmDetailsComponent, this.#container.parentElement);
  };

  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  };

  #addFilmShowMoreComponent = () => {
    render(this.#filmShowMoreComponent, this.#filmsListComponent.element);

    this.#filmShowMoreComponent.setButtonClickHandler(() => this.#showMoreButtonClickHandler());
  };

  #removeFilmShowMoreComponent = () => {
    remove(this.#filmShowMoreComponent);
  };

  #showMoreButtonClickHandler = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_STEP)
      .forEach((film) => this.#renderFilm(film, this.#filmsListContainerComponent));

    this.#renderedFilmCount += FILM_COUNT_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#removeFilmShowMoreComponent();
    }
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}

export default FilmsPresenter;
