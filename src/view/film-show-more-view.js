import AbstractView from '../framework/view/abstract-view.js';

const createFilmShowMoreTemplate = () =>
  `
    <button class="films-list__show-more">Show more</button>
  `;

class FilmShowMoreView extends AbstractView {
  get template() {
    return createFilmShowMoreTemplate();
  }

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.buttonClick();
  };
}

export default FilmShowMoreView;
