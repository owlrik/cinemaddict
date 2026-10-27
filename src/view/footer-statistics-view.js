import AbstractView from '../framework/view/abstract-view.js';

const generateMovieText = (count) =>
  (count === 1)
    ? 'movie'
    : 'movies';

const createFooterStatisticsTemplate = (count = 0) =>
  `
    <p>${count} ${generateMovieText(count)} inside</p>
  `;

class FooterStatisticsView extends AbstractView {
  #count = null;

  constructor(count) {
    super();

    this.#count = count;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#count);
  }
}

export default FooterStatisticsView;
