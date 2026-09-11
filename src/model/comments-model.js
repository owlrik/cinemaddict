import { generateComments } from '../mock/comment.js';

class CommentsModel {
  #filmsModel = null;
  #allFilmComments = [];
  #filmComments = [];

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  #generateAllComments() {
    this.#allFilmComments = generateComments(this.#filmsModel.films);
  }

  set filmComments(film) {
    this.#filmComments = film.comments.map((commentId) =>
      this.#allFilmComments.find((comment) =>
        comment.id === commentId
      )
    );
  }

  get filmComments() {
    return this.#filmComments;
  }
}

export default CommentsModel;
