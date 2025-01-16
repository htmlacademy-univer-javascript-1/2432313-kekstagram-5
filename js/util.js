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

const removeDuplicate = (arr) => [...new Set(arr)];

const checkingMaxLength = (text, count) => text.length <= count;

const DEBOUNCE_INTERVAL = 500;

const debounce = (callback) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      callback(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const getPhotoSrc = (fileChooser) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  return new Promise((resolve, reject) => {
    if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('load', () => resolve(reader.result), { once: true });
    } else {
      reject('Неверный формат файла');
    }
  });
};


export {getRandomInt,getRandomArrayElement,getUniqueValue,isEscEvent,getWordEnding,removeDuplicate,checkingMaxLength,debounce,shuffle,getPhotoSrc};
