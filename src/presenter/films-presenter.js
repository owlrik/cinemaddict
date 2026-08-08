import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';

import { render } from '../render.js';

class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmListView();
  filmsListContainerComponent = new FilmListContainerView();

  constructor({ filmsContainer, filmsModel, commentsModel }) {
    this.container = filmsContainer;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;
  }

  init() {
    this.films = [...this.filmsModel.getFilms()];

    render(new SortView(), this.container);
    render(this.filmsComponent, this.container);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView({film: this.films[i]}), this.filmsListContainerComponent.getElement());
    }

    render(new FilmShowMoreView(), this.filmsListComponent.getElement());

    const comments = [...this.commentsModel.getComments(this.films[0])];

    render(new FilmDetailsView(this.films[0], comments), this.container.parentElement);
  }
}

export default FilmsPresenter;
