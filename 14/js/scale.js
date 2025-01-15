const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const getValue = (percent) => {
  if (percent[percent.length - 1] === '%') {
    return +percent.slice(0, percent.length - 1);
  } else {
    return +percent;
  }
};

const zoomImage = (value) => {
  scaleControlValue.value = `${value}%`;
  imgPreview.style = `transform: scale(${value / 100})`;
};

const zoomIn = () => {
  let value = getValue(scaleControlValue.value) - Scale.STEP;
  if (value < Scale.MIN) {
    value = Scale.MIN;
  }

  zoomImage(value);
};

const zoomOut = () => {
  let value = getValue(scaleControlValue.value) + Scale.STEP;
  if (value > Scale.MAX) {
    value = Scale.MAX;
  }

  zoomImage(value);
};

export { zoomIn, zoomOut };
