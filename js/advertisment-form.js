import {showAlert} from './util.js';
import {sendData} from './api.js';
import { showSuccessMessage } from './show-success-message.js';
import {map,TOKIO_CENTER} from './map-set.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formResetButton = adForm.querySelector('.ad-form__reset');
const address = adForm.querySelector('#address');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const apartmentType = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const MIN_PRICE = {
  bungalow : 0,
  hotel : 3000,
  house : 5000,
  palace : 10000,
  flat : 1000,
};

const onSuccess = () => {
  adForm.reset();
  mapFilters.reset();
  showSuccessMessage();
  map.setMainMarkerPos(TOKIO_CENTER);
  address.value = `${map.getMainMarkerPos().lat}, ${map.getMainMarkerPos().lng}`;
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
  mapFilters.reset();
  map.setMainMarkerPos(TOKIO_CENTER);
  address.value = `${map.getMainMarkerPos().lat}, ${map.getMainMarkerPos().lng}`;
};

formResetButton.addEventListener('click', () => {
  resetForm();
});

map.onMainMarkerMoveEnd((pos) => {
  address.value = `${pos.lat}, ${pos.lng}`;
});

address.value = `${map.getMainMarkerPos().lat}, ${map.getMainMarkerPos().lng}`;

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Минимум ${ MIN_TITLE_LENGTH} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Максимум ${MAX_TITLE_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

apartmentType.addEventListener('change', () => {
  priceInput.placeholder = MIN_PRICE[apartmentType.value];
});

const checkingPrice = () => {
  priceInput.min = MIN_PRICE[apartmentType.value];
  if (priceInput.value < priceInput.min) {
    priceInput.setCustomValidity(`Минимальная стоимость - ${priceInput.min} р.`);
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
  if (capacity.value === '0' && roomNumber.value !=='100') {
    capacity.setCustomValidity('Это жилье только для гостей');
  } else if (roomNumber.value === '100' && capacity.value > 0) {
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

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const mapFiltersElements = mapFilters.getElementsByTagName('select');
const mapFiltersElementsArr = Array.from(mapFiltersElements);

const adFormElements = adForm.getElementsByTagName('fieldset');
const formElementsArr = Array.from(adFormElements);

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  formElementsArr.forEach((item) => {
    item.disabled = true;
  });

  mapFiltersElementsArr.forEach((item) => {
    item.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  formElementsArr.forEach((item) => {
    item.disabled = false;
  });

  mapFiltersElementsArr.forEach((item) => {
    item.disabled = false;
  });
};

disableForm();

map.onLoad(activateForm());

export{activateForm,setUserFormSubmit,adForm,formResetButton,address};
