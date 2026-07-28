import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { render } from '../render.js';

import { FILM_COUNT } from '../const.js';

class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmListView();
  filmsListContainerComponent = new FilmListContainerView();

  constructor({ filmsContainer }) {
    this.container = filmsContainer;
  }

  init() {
    render(new SortView(), this.container);
    render(this.filmsComponent, this.container);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < FILM_COUNT; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }

    render(new FilmShowMoreView(), this.filmsListComponent.getElement());

    render(new FilmDetailsView(), this.container.parentElement);
  }
}

export default FilmsPresenter;
