const getRandomPositiveInteger = (a = 0, b = 1000) => {
  if (a < 0 || b < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }

  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return +(Math.random() * (upper - lower) + lower).toFixed(digits);
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement };
