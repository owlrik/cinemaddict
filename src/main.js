import HeaderProfileView from './view/header-profile-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';

import { generateFilms } from './mock/film.js';
import { generateComments } from './mock/comment.js';

import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmsPresenter = new FilmsPresenter({filmsContainer: siteMainElement});

render(new HeaderProfileView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterStatisticsElement);

filmsPresenter.init();

const films = generateFilms();
const comments = generateComments(films);

console.log(films, comments);
