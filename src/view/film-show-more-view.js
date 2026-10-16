import AbstractView from '../framework/view/abstract-view.js';

const createFilmShowMoreTemplate = () =>
  `
    <button class="films-list__show-more">Show more</button>
  `;

class FilmShowMoreView extends AbstractView {
  get template() {
    return createFilmShowMoreTemplate();
  }
}

export default FilmShowMoreView;
