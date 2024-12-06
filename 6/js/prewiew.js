/* eslint-disable no-console */
import { posts } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createPostPrewiew = (post) =>{
  const postPrewiew = pictureTemplate.cloneNode(true);

  const postImg = postPrewiew.querySelector('.picture__img');
  postImg.src = post.url;
  postImg.alt = post.description;
  postPrewiew.querySelector('.picture__likes').textContent = post.likes;
  postPrewiew.querySelector('.picture__comments').textContent = post.comments.length;

  return postPrewiew;
};

const renderPosts = () => {
  const pictureFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    pictureFragment.appendChild(createPostPrewiew(post));
  });

  picturesContainer.appendChild(pictureFragment);
};

export{renderPosts};
