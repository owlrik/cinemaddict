import { getRandomPositiveInteger, getRandomArrayElement } from '../utils.js';

import { FILM_COUNT } from '../const.js';

import {
  NAME_COUNT, MAX_COMMENTS_ON_FILM, GenreCount, Rating,
  AgeRating, Runtime, YearsDuration, names, surnames,
  titles, posters, genres, description, countries,
} from './const.js';

const getDate = () => {
  const date = new Date();

  date.setFullYear(
    date.getFullYear() - getRandomPositiveInteger(YearsDuration.MIN, YearsDuration.MAX)
  );

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
    date: getDate(),
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

  return films.map((film, index) => {
    const hasComments = getRandomPositiveInteger(0, 1);

    const filmCommentsCount = (hasComments)
      ? getRandomPositiveInteger(1, MAX_COMMENTS_ON_FILM)
      : 0;

    totalCommentsCount += filmCommentsCount;

    return {
      id: String(index + 1),
      comments: (hasComments)
        ? Array.from({length: filmCommentsCount},
          (_value, commentIndex) => String(totalCommentsCount - commentIndex)
        )
        : [],
      filmInfo: film,
    };
  });
};

export { generateFilms };
