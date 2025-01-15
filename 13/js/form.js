/* eslint-disable no-use-before-define */
import { isEscEvent, getPhotoSrc } from './util.js';
import { zoomIn, zoomOut } from './scale.js';
import { resetEffectImage, createSlider, destroySlider,onEffectsChange } from './effects.js';
import { validationText } from './validation.js';

import { showSuccessLoad, showErrorLoad } from './modal.js';
import { request } from './network.js';

const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const fileInput = imgUpload.querySelector('#upload-file');
const imgOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgCancelButton = imgUpload.querySelector('.img-upload__cancel');

const imgPreview = document.querySelector('.img-upload__preview img');
const imgEffectsPreviews = imgPreview.querySelectorAll('.effects__preview');

const imgScale = document.querySelector('.img-upload__scale');
const scaleControlValue = imgScale.querySelector('.scale__control--value');
const scaleControlSmaller = imgScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgScale.querySelector('.scale__control--bigger');

const effects = document.querySelector('.img-upload__effects');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const onHashtagsInput = () => validationText(textHashtags, 'hashtag');
const onDescriptionInput = () => validationText(textDescription, 'description');


const openUploadForm = () => {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  resetForm();
  createSlider();

  document.addEventListener('keydown', onPopupEscKeydown);
  imgCancelButton.addEventListener('click', closeUploadForm);
  scaleControlSmaller.addEventListener('click', zoomIn);
  scaleControlBigger.addEventListener('click', zoomOut);
  effects.addEventListener('change', onEffectsChange);
  textHashtags.addEventListener('input', onHashtagsInput);
  textDescription.addEventListener('input', onDescriptionInput);
  imgUpload.addEventListener('submit', onImgUploadFormSubmit);

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
  effects.removeEventListener('change', onEffectsChange);
  textHashtags.removeEventListener('input', onHashtagsInput);
  textDescription.removeEventListener('input', onDescriptionInput);
  imgUpload.removeEventListener('submit', onImgUploadFormSubmit);

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

const onImgUploadFormSubmit = (evt) => {
  evt.preventDefault();

  request(onSuccess, showErrorLoad, 'POST', new FormData(evt.target));
};

const renderPhotoPreview = (src) => {
  imgPreview.src = src;

  imgEffectsPreviews.forEach((element) => {
    element.style.backgroundImage = `url(${src})`;
  });
};

const loadPreview = () => {
  getPhotoSrc(fileInput)
    .then((data) => renderPhotoPreview(data))
    .then(() => openUploadForm())
    .catch((error) => showErrorLoad(error));
};

fileInput.addEventListener('change', loadPreview);

