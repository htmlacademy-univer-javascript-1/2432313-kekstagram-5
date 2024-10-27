import {getRandomInt,getRandomArrayElement,getUniqueValue} from './util.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Это я в Дубае',
  'Волк в цирке не выступает',
  'Как здорово, что все мы здесь сегодня собрались',
  'За деньги да',
  'Как шоколадка',
  'Бу! Испугался?',
  'Мама, я на продленке! Не звони мне',
  'Я слушаю только Шамана и гимн России!'
];

const COUNT_LIKES = {
  min: 15,
  max: 200
};

const COUNT_COMMENTS = {
  min: 0,
  max: 30
};

const COUNT_POSTS = 25;
const COUNT_AVATAR = 6;

const arrayIds = [];

const createComment = () =>{
  let commentId;

  for (let i = 0; i < getRandomInt(COUNT_COMMENTS.min, COUNT_COMMENTS.max); i++) {
    commentId = getUniqueValue(arrayIds, 1, 999);
    arrayIds.push(commentId);

    return{
      id: commentId,
      avatar: `img/avatar-${getRandomInt(1, COUNT_AVATAR)}.svg`,
      message: getRandomArrayElement(MESSAGE),
      name: getRandomArrayElement(NAMES),
    };
  }
};

const createPosts = (i) => {
  const post = {
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInt(COUNT_LIKES.min,COUNT_LIKES.max),
    comments: createComment()
  };
  return post;
};

const posts = Array.from({ length: COUNT_POSTS }, (_, i) => createPosts(i + 1));

export {posts};
