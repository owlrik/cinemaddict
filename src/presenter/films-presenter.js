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

import { isEscapeKey, updateItem } from '../utils/common.js';

class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmListView();
  #filmsListContainerComponent = new FilmListContainerView();
  #filmShowMoreComponent = new FilmShowMoreView();
  #sortComponent = new SortView();
  #noTaskComponent = new FilmListEmptyView();

  #filmPresenters = new Map();
  #filmDetailsPresenter = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_STEP;
  #selectedFilm = null;

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
      this.#addFilmShowMoreComponent(this.#filmsListComponent.element);
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
      this.#onEscKeyDown,
      this.#filmChangeHandler
    );

    filmPresenter.init(film);
    this.#filmPresenters.set(film.id, filmPresenter);
  };

  #renderFilmDetails = () => {
    this.#commentsModel.filmComments = this.#selectedFilm;
    const comments = [...this.#commentsModel.filmComments];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        this.#container.parentElement,
        this.#removeFilmDetailsComponent,
        this.#onEscKeyDown,
        this.#filmChangeHandler
      );
    }

    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
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
    if (this.#selectedFilm && this.#selectedFilm.id === film.id) {
      return;
    }

    if (this.#selectedFilm && this.#selectedFilm.id !== film.id) {
      this.#removeFilmDetailsComponent();
    }

    this.#selectedFilm = film;
    this.#renderFilmDetails();

    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;

    document.body.classList.remove('hide-overflow');
  };

  #addFilmShowMoreComponent = (container) => {
    render(this.#filmShowMoreComponent, container);

    this.#filmShowMoreComponent.setButtonClickHandler(() => this.#showMoreButtonClickHandler());
  };

  #removeFilmShowMoreComponent = () => {
    remove(this.#filmShowMoreComponent);
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);

    this.#filmPresenters.get(updatedFilm.id).init(updatedFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmDetails();
    }
  };

  #showMoreButtonClickHandler = () => {
    this.#renderFilms(
      this.#renderedFilmCount,
      this.#renderedFilmCount + FILM_COUNT_STEP,
      this.#filmsListContainerComponent.element
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
