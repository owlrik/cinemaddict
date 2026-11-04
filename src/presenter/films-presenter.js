import { render, remove } from '../framework/render.js';

import FilmPresenter from './film-presenter.js';
import FilmDetailsPresenter from './film-details-presenter.js';

import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';

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
  #sortComponent = new SortView();
  #noTaskComponent = new FilmListEmptyView();

  #filmPresenters = new Map();

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
      this.#renderNoTasks();
      return;
    }

    this.#renderSort(this.#container);
    this.#renderFilmListContainer(this.#container);
    this.#renderFilmList();
  };

  #renderSort = (container) => {
    render(this.#sortComponent, container);
  };

  #renderFilmListContainer = (container) => {
    render(this.#filmsComponent, container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
  };

  #renderFilmList = () => {
    this.#renderFilms(
      0,
      Math.min(this.#films.length, FILM_COUNT_STEP),
      this.#filmsListContainerComponent.element
    );

    if (this.#films.length > FILM_COUNT_STEP) {
      this.#addFilmShowMoreComponent();
    }
  };

  #renderFilms = (from, to, container) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, container));
  };

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(
      container,
      this.#addFilmDetailsComponent,
      this.#onEscKeyDown
    );

    filmPresenter.init(film);
    this.#filmPresenters.set(film.id, filmPresenter);
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.filmComments = film;
    const comments = [...this.#commentsModel.filmComments];

    const filmDetailsPresenter = new FilmDetailsPresenter(
      this.#container.parentElement,
      this.#removeFilmDetailsComponent,
      this.#onEscKeyDown
    );

    filmDetailsPresenter.init(film, comments);
  };

  #renderNoTasks = () => {
    render(this.#noTaskComponent, this.#container);
  };

  #clearFilmList = () => {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderedFilmCount = FILM_COUNT_STEP;

    remove(this.#filmShowMoreComponent);
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
    this.#renderFilms(
      this.#renderedFilmCount,
      this.#renderedFilmCount + FILM_COUNT_STEP,
      this.#filmsListContainerComponent
    );

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
