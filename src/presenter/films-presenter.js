import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { render } from '../render.js';

import { isEscapeKey } from '../utils.js';

class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmListView();
  #filmsListContainerComponent = new FilmListContainerView();
  #filmDetailsComponent = null;

  #films = [];

  constructor({ filmsContainer, filmsModel, commentsModel }) {
    this.#container = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];

    render(new SortView(), this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#films.forEach((film) => {
      this.#renderFilm(film, this.#filmsListContainerComponent);
    });

    render(new FilmShowMoreView(), this.#filmsListComponent.element);
  };

  #renderFilm = (film, container) => {
    const filmCardComponent = new FilmCardView({film});

    const filmCardLinkElement = filmCardComponent.element.querySelector('.film-card__link');

    filmCardLinkElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#addFilmDetailsComponent(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(filmCardComponent, container.element);
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.filmComments = film;
    const comments = [...this.#commentsModel.filmComments];
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);

    const filmDetailsCloseButtonElement = this.#filmDetailsComponent.element.querySelector('.film-details__close-btn');

    filmDetailsCloseButtonElement.addEventListener('click', () => {
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
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove('hide-overflow');
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
