const adForm = document.querySelector('.ad-form');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const titleInput = adForm.querySelector('#title');

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

const priceInput = adForm.querySelector('#price');
const apartmentType = adForm.querySelector('#type');

const MIN_PRICE = {
  bungalow : 0,
  hotel : 3000,
  house : 5000,
  palace : 10000,
  flat : 1000,
};

apartmentType.addEventListener('change', () => {
  priceInput.placeholder = MIN_PRICE[apartmentType.value];
});

priceInput.addEventListener('input', () => {
  if (priceInput.value < MIN_PRICE[apartmentType.value]) {
    priceInput.setCustomValidity(`Минимальная стоимость  - ${MIN_PRICE[apartmentType.value]} р.`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

apartmentType.addEventListener('change', () => {
  if (priceInput.value < MIN_PRICE[apartmentType.value]) {
    priceInput.setCustomValidity(`Минимальная стоимость  - ${MIN_PRICE[apartmentType.value]} р.`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

capacity.addEventListener('change', () => {
  if (capacity.value > roomNumber.value) {
    capacity.setCustomValidity('Слишком много гостей для выбранного количества комнат');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
});

roomNumber.addEventListener('change', () => {
  if (capacity.value > roomNumber.value) {
    capacity.setCustomValidity('Слишком много гостей для выбранного количества комнат');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
});
