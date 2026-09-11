import { generateFilms } from '../mock/film.js';

class FilmsModel {
  #films = generateFilms();

  get films() {
    return this.#films;
  }
}

export default FilmsModel;
