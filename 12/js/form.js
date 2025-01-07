/* eslint-disable no-use-before-define */
import { isEscEvent } from './util.js';
import { zoomIn, zoomOut } from './scale.js';
import { resetEffectImage, createSlider, destroySlider } from './effects.js';
import { validationHashtag } from './validation.js';
import { showSuccessLoad, showErrorLoad } from './modal.js';
import { request } from './network.js';

const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const fileInput = imgUpload.querySelector('#upload-file');
const imgOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgCancelButton = imgUpload.querySelector('.img-upload__cancel');

const imgPreview = document.querySelector('.img-upload__preview img');
const imgScale = document.querySelector('.img-upload__scale');
const scaleControlValue = imgScale.querySelector('.scale__control--value');
const scaleControlSmaller = imgScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgScale.querySelector('.scale__control--bigger');

const textHashtags = document.querySelector('.text__hashtags');

const openUploadForm = () => {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  resetForm();
  createSlider();

  document.addEventListener('keydown', onPopupEscKeydown);
  imgCancelButton.addEventListener('click', closeUploadForm);
  scaleControlSmaller.addEventListener('click', zoomIn);
  scaleControlBigger.addEventListener('click', zoomOut);
  textHashtags.addEventListener('input', onHashtagsInput);
};

const closeUploadForm = () => {
  imgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  fileInput.value = '';
  destroySlider();

  document.removeEventListener('keydown', onPopupEscKeydown);
  imgCancelButton.removeEventListener('click', closeUploadForm);
  scaleControlSmaller.removeEventListener('click', zoomIn);
  scaleControlBigger.removeEventListener('click', zoomOut);
  textHashtags.removeEventListener('input', onHashtagsInput);
};

const onHashtagsInput = () => {
  textHashtags.setCustomValidity('');
  textHashtags.style.border = 'none';

  const errorMessage = validationHashtag(textHashtags.value);
  if (errorMessage) {
    textHashtags.setCustomValidity(errorMessage);
    textHashtags.style.border = '2px solid red';
  } else {
    textHashtags.style.border = 'none';
  }

  textHashtags.reportValidity();
};

const resetForm = () => {
  scaleControlValue.value = '100%';
  imgPreview.style = '';

  resetEffectImage();
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    if (!document.activeElement.matches('.text__hashtags') && !document.activeElement.matches('.text__description')) {
      closeUploadForm();
    }
  }
};

const onSuccess = () => {
  closeUploadForm();
  showSuccessLoad();
};

fileInput.addEventListener('change', openUploadForm);

imgUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();

  request(onSuccess, showErrorLoad, 'POST', new FormData(evt.target));
});

