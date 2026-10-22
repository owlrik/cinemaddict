import { FILM_COUNT } from '../const.js';

import {
  NAME_COUNT, MAX_COMMENTS_ON_FILM, GenreCount, Rating,
  AgeRating, Runtime, YearsDuration, DaysDuration, DateType,
  names, surnames, titles, posters, genres, description, countries,
} from './const.js';

import { getRandomArrayElement, getRandomPositiveInteger } from '../utils/common.js';

const getDate = (type) => {
  const date = new Date();

  switch (type) {
    case DateType.FILM_INFO:
      date.setFullYear(
        date.getFullYear() - getRandomPositiveInteger(YearsDuration.MIN, YearsDuration.MAX)
      );
      break;
    case DateType.USER_DETAILS:
      date.setDate(
        date.getDate() - getRandomPositiveInteger(DaysDuration.MIN, DaysDuration.MAX)
      );
      break;
  }

  return date.toISOString();
};

const generateFilm = () => ({
  title: getRandomArrayElement(titles),
  alternativeTitle: getRandomArrayElement(titles),
  totalRating: getRandomPositiveInteger(Rating.MIN, Rating.MAX),
  poster: getRandomArrayElement(posters),
  ageRating: getRandomPositiveInteger(AgeRating.MIN, AgeRating.MAX),
  director: `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`,
  writers: Array.from(
    {length: NAME_COUNT},
    () => `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`
  ),
  actors: Array.from(
    {length: NAME_COUNT},
    () => `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`
  ),
  release: {
    date: getDate(DateType.FILM_INFO),
    releaseCountry: getRandomArrayElement(countries)
  },
  runtime: getRandomPositiveInteger(Runtime.MIN, Runtime.MAX),
  genre:  Array.from(
    {length: getRandomPositiveInteger(GenreCount.MIN, GenreCount.MAX)},
    () => getRandomArrayElement(genres)
  ),
  description
});

const generateFilms = () => {
  const films = Array.from({length: FILM_COUNT}, generateFilm);

  let totalCommentsCount = 0;

  const getWatchingDate = () => getDate(DateType.USER_DETAILS);

  return films.map((film, index) => {
    const hasComments = getRandomPositiveInteger(0, 1);

    const filmCommentsCount = (hasComments)
      ? getRandomPositiveInteger(1, MAX_COMMENTS_ON_FILM)
      : 0;

    totalCommentsCount += filmCommentsCount;

    const alreadyWatched = Boolean(getRandomPositiveInteger(0, 1));

    return {
      id: String(index + 1),
      comments: (hasComments)
        ? Array.from({length: filmCommentsCount},
          (_value, commentIndex) => String(totalCommentsCount - commentIndex)
        )
        : [],
      filmInfo: film,
      userDetails: {
        watchlist: Boolean(getRandomPositiveInteger(0, 1)),
        alreadyWatched,
        watchingDate: (alreadyWatched) ? getWatchingDate() : null,
        favorite: Boolean(getRandomPositiveInteger(0, 1))
      }
    };
  });
};

export { generateFilms };
