import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { render } from '../render.js';

class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmListView();
  #filmsListContainerComponent = new FilmListContainerView();

  #films = [];

  constructor({ filmsContainer, filmsModel, commentsModel }) {
    this.#container = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  #renderFilmCard(film) {
    const filmComponent = new FilmCardView({film});

    render(filmComponent, this.#filmsListContainerComponent.element);
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    render(new SortView(), this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilmCard(this.#films[i]);
    }

    render(new FilmShowMoreView(), this.#filmsListComponent.element);

    this.#commentsModel.filmComments = this.#films[0];
    const comments = [...this.#commentsModel.filmComments];

    render(new FilmDetailsView(this.#films[0], comments), this.#container.parentElement);
  }
}

export default FilmsPresenter;
