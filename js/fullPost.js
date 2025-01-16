import {isEscEvent,getWordEnding} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const social = bigPicture.querySelector('.social');
const socialComments = social.querySelector('.social__comments');
const socialCommentsCount = social.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const buttonCancel = document.querySelector('.big-picture__cancel');
const overlay = document.querySelector('.overlay');
const commentsLoader = document.querySelector('.comments-loader');

const COMMENTS_COUNT_FIRST = 5;
const COMMENTS_COUNT_LOAD_SECOND = 5;
let commentsCountLoaded = 0;

const checkTheHiddenLoadComments = (flag) => {
  if (flag) {
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  } else {
    socialCommentsCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }
};

const createComment = (comment) => {
  const commentBlock = commentTemplate.cloneNode(true);
  const commentImg = commentBlock.querySelector('.social__picture');

  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentBlock.querySelector('.social__text').textContent = comment.message;

  return commentBlock;
};

const createCommentsFragment = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment)=>{
    commentsFragment.appendChild(createComment(comment));
  });

  return commentsFragment;
};

let closeBigPicture = ()=>{};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onOverlayClick = (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeBigPicture();
  }
};

closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  buttonCancel.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onPopupEscKeydown);
  overlay.removeEventListener('click', onOverlayClick);
};


const setupBigPicture = () => {
  buttonCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  overlay.addEventListener('click', onOverlayClick);
};

setupBigPicture();

const renderComments = (comments) => {
  const onCommentsLoaderClick = (comment) => {
    renderComments(comment);
  };

  if (comments.length > 0) {
    if (!commentsCountLoaded) {
      socialComments.appendChild(createCommentsFragment(comments.slice(0, COMMENTS_COUNT_FIRST)));
      commentsCountLoaded = COMMENTS_COUNT_FIRST;
    } else {
      socialComments.appendChild(createCommentsFragment(comments.slice(commentsCountLoaded, commentsCountLoaded + COMMENTS_COUNT_LOAD_SECOND)));
      commentsCountLoaded += COMMENTS_COUNT_LOAD_SECOND;
    }

    if (comments.length > Math.max(COMMENTS_COUNT_FIRST, commentsCountLoaded)) {
      checkTheHiddenLoadComments(false);
      socialCommentsCount.innerHTML = `${commentsCountLoaded} из <span class="comments-count">${comments.length}</span> ${getWordEnding(comments.length, ['комментария', 'комментариев', 'комментариев'])}`;

      commentsLoader.addEventListener('click', onCommentsLoaderClick.bind(null, comments), { once: true });
      return;
    }
  }

  checkTheHiddenLoadComments(true);
};

const renderPost = (post) => {
  bigPicture.querySelector('.big-picture__img img').src = post.url;
  social.querySelector('.likes-count').textContent = post.likes;
  socialCommentsCount.querySelector('.comments-count').textContent = post.comments.length;
  social.querySelector('.social__caption').textContent = post.description;

  socialComments.innerHTML = '';
  commentsCountLoaded = 0;
  renderComments(post.comments);
};

const postIsOpen = (post) => {
  renderPost(post);

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  buttonCancel.addEventListener('click',closeBigPicture);
  document.addEventListener('keydown',onPopupEscKeydown);
  overlay.addEventListener('click',onOverlayClick);
};

export{postIsOpen};
