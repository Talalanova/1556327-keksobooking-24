import {showAlert} from './util.js';
import {sendData,getData} from './api.js';
import {showSuccessMessage} from './show-success-message.js';
import {map,TOKIO_CENTER,renderMarkers} from './map-set.js';
import {getAdTemplate} from './draw-advertisment.js';
import {filtersForm} from './map-filters.js';
import {avatarPreview,housePhotoPreview} from './add-photo.js';

const adForm = document.querySelector('.ad-form');
const formResetButton = adForm.querySelector('.ad-form__reset');
const address = adForm.querySelector('#address');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const apartmentType = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const adFormElements = adForm.getElementsByTagName('fieldset');
const formElementsArr = Array.from(adFormElements);
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const MIN_PRICES = {
  bungalow : 0,
  hotel : 3000,
  house : 5000,
  palace : 10000,
  flat : 1000,
};

const minCapacity = 0;
const maxRooms = 100;

const setDefaultOption = () => {
  map.setMainMarkerPos(TOKIO_CENTER);
  address.value = `${map.getMainMarkerPos().lat.toFixed(5)}, ${map.getMainMarkerPos().lng.toFixed(5)}`;
  priceInput.placeholder = MIN_PRICES[apartmentType.value];
};

const clearFiles = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  housePhotoPreview.querySelectorAll('*').forEach((element) => element.remove());
};

const onSuccess = () => {
  adForm.reset();
  filtersForm.reset();
  map.clearMarkers();
  getData((advertisments) => {
    renderMarkers(advertisments,getAdTemplate);
  });
  showSuccessMessage();
  setDefaultOption();
  clearFiles();
};

const onError = () => {
  showAlert('Не удалось отправить форму. Проверьте обязательные поля и попробуйте ещё раз');
};

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      onSuccess,
      onError,
      new FormData(evt.target),
    );
  });
};

const resetForm = () => {
  adForm.reset();
  filtersForm.reset();
  map.clearMarkers();
  getData((advertisments) => {
    renderMarkers(advertisments,getAdTemplate);
  });
  setDefaultOption();
  clearFiles();
};

formResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

map.onMainMarkerMoveEnd((pos) => {
  address.value = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
});

address.value = `${map.getMainMarkerPos().lat.toFixed(5)}, ${map.getMainMarkerPos().lng.toFixed(5)}`;

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Минимум ${MIN_TITLE_LENGTH} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Максимум ${MAX_TITLE_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

apartmentType.addEventListener('change', () => {
  priceInput.placeholder = MIN_PRICES[apartmentType.value];
});

const checkingPrice = () => {
  if (priceInput.value < MIN_PRICES[apartmentType.value]) {
    priceInput.setCustomValidity(`Минимальная стоимость - ${MIN_PRICES[apartmentType.value]} р.`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
};

priceInput.addEventListener('input', () => {
  checkingPrice();
});

apartmentType.addEventListener('change', () => {
  checkingPrice();
});

const checkingCapacity = () => {
  if (capacity.value === `${minCapacity}` && roomNumber.value !==`${maxRooms}`) {
    capacity.setCustomValidity('Это жилье только для гостей');
  } else if (roomNumber.value === `${maxRooms}` && capacity.value > `${minCapacity}`) {
    capacity.setCustomValidity('В этом жилье нельзя размещать гостей');
  } else if (capacity.value > roomNumber.value) {
    capacity.setCustomValidity('Слишком много гостей для выбранного количества комнат');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
};

capacity.addEventListener('change', () => {
  checkingCapacity();
});

roomNumber.addEventListener('change', () => {
  checkingCapacity();
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  formElementsArr.forEach((item) => {
    item.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formElementsArr.forEach((item) => {
    item.disabled = false;
  });
};

disableForm();

map.onLoad(activateForm());

export {activateForm,setUserFormSubmit,adForm,address};
