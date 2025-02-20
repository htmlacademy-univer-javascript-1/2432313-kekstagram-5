import '../vendor/nouislider/nouislider.js';

const Effect = {
  chrome: { min: 0, max: 1, step: 0.1, style: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, style: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, style: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, style: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, style: (value) => `brightness(${value})` },
  original: { min: 0, max: 100, step: 1, style: () => 'original' },
};

const effectLevel = document.querySelector('.effect-level');
const slider = effectLevel.querySelector('.effect-level__slider');
const sliderValue = effectLevel.querySelector('.effect-level__value');

const imgPreview = document.querySelector('.img-upload__preview img');

const imgEffect = {
  effect: 'original',
  value: 100,
};

const updateEffectImage = () => {
  sliderValue.value = imgEffect.value;
  imgPreview.style.filter = Effect[imgEffect.effect].style(imgEffect.value);

  imgPreview.classList.forEach((item) => {
    if (item.includes('effects__preview--')) {
      imgPreview.classList.remove(item);
    }
  });

  imgPreview.classList.add(`effects__preview--${imgEffect.effect}`);

  if (imgEffect.effect === 'original') {
    effectLevel.classList.add('visually-hidden');
  } else {
    effectLevel.classList.remove('visually-hidden');
  }
};

const resetEffectImage = () => {
  imgEffect.effect = 'original';
  imgEffect.value = 100;

  updateEffectImage();
};

const createSlider = () => {
  window.noUiSlider.create(slider, {
    range: {
      min: Effect[imgEffect.effect].min,
      max: Effect[imgEffect.effect].max,
    },
    start: Effect[imgEffect.effect].max,
    step: Effect[imgEffect.effect].step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  slider.noUiSlider.on('update', (values, handle) => {
    imgEffect.value = values[handle];

    updateEffectImage();
  });
};

const updateOptionsSlider = (effect) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: Effect[effect].min,
      max: Effect[effect].max,
    },
    start: Effect[effect].max,
    step: Effect[effect].step,
  });
};

const destroySlider = () => {
  slider.noUiSlider.destroy();
};

const onEffectsChange = (evt) => {
  const effect = evt.target.id.split('-')[1];

  imgEffect.effect = effect;

  updateOptionsSlider(effect);
  updateEffectImage();
};

export { resetEffectImage, createSlider, destroySlider,onEffectsChange};
