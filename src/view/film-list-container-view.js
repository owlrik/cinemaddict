import AbstractView from '../framework/view/abstract-view.js';

const createFilmListContainerTemplate = () =>
  `
    <div class="films-list__container"></div>
  `;

class FilmListContainerView extends AbstractView {
  get template() {
    return createFilmListContainerTemplate();
  }
}

export default FilmListContainerView;
