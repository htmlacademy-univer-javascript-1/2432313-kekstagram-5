//модуль с функциями по числам
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const getUniqueValue = (array, min, max) => {
  const id = getRandomInt(min, max);

  if (array.some((item) => item === id)) {
    getUniqueValue(array, min, max);
  }
  return id;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getWordEnding = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

export {getRandomInt,getRandomArrayElement,getUniqueValue,isEscEvent,getWordEnding};
