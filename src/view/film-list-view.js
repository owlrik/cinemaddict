import AbstractView from '../framework/view/abstract-view.js';

const createFilmListTemplate = () =>
  `
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  `;

class FilmListView extends AbstractView {
  get template() {
    return createFilmListTemplate();
  }
}

export default FilmListView;
