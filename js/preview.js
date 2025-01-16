import { showBlockFilter } from './filter.js';
import {postIsOpen} from './fullPost.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');

const createPostPrewiew = (post) =>{
  const postPrewiew = pictureTemplate.cloneNode(true);

  const postImg = postPrewiew.querySelector('.picture__img');
  postImg.src = post.url;
  postImg.alt = post.description;
  postPrewiew.querySelector('.picture__likes').textContent = post.likes;
  postPrewiew.querySelector('.picture__comments').textContent = post.comments.length;

  postPrewiew.addEventListener('click',(evt)=>{
    evt.preventDefault();
    postIsOpen(post);
  });
  return postPrewiew;
};

const renderPosts = (posts, callback) => {
  const pictureFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    pictureFragment.appendChild(createPostPrewiew(post));
  });

  picturesBlock.appendChild(pictureFragment);

  showBlockFilter();

  if (callback) {
    callback();
  }
};

const removePictures = () => {
  const pictures = picturesBlock.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });
};

export{renderPosts, removePictures};
