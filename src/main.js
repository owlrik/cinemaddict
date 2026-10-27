import { render } from './framework/render.js';

import HeaderProfileView from './view/header-profile-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

import { getUserStatus } from './utils/user.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMainElement,
  filmsModel,
  commentsModel
});

const userStatus = getUserStatus(filmsModel.films);
const filters = generateFilter(filmsModel.films);
const filmCount = filmsModel.films.length;

render(new HeaderProfileView(userStatus), siteHeaderElement);
render(new FilterView(filters), siteMainElement);
render(new FooterStatisticsView(filmCount), siteFooterStatisticsElement);

filmsPresenter.init();
