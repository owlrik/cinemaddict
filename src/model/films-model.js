import { generateFilms } from '../mock/film.js';

class FilmsModel {
  films = generateFilms();

  getFilms() {
    return this.films;
  }
}

export default FilmsModel;
