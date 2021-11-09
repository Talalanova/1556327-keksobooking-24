import {getData} from './api.js';
import {map} from './map-set.js';

const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = [...filtersForm.querySelectorAll('[type="checkbox"]')];
const filtersFormElements = [...filtersForm.children];

const HOUSING_TYPE_VALUES = {
  'any': (value) => value,
  'bungalow': (value) => value === 'bungalow',
  'hotel': (value) => value === 'hotel',
  'house': (value) => value === 'house',
  'flat': (value) => value === 'flat',
  'palace': (value) => value === 'palace',
};
const PRICE_VALUES = {
  'any': (value) => value,
  'middle': (value) => value >= 10000 && value <= 50000,
  'low': (value) => value <= 10000,
  'high': (value) => value >= 50000,
};
const ROOMS_VALUES = {
  'any': (value) => value,
  '1': (value) => value === 1,
  '2': (value) => value === 2,
  '3': (value) => value === 3,
};
const GUESTS_VALUES = {
  'any': (value) => value,
  '0': (value) => value === 0,
  '1': (value) => value === 1,
  '2': (value) => value === 2,
};

const filterByHousingType = (sortItem) => {
  const type = sortItem.offer.type;
  return HOUSING_TYPE_VALUES[housingType.value](type);
};
const filterByPrice = (sortItem) => {
  const price = sortItem.offer.price;
  return PRICE_VALUES[housingPrice.value](price);
};
const filterByRooms = (sortItem) => {
  const rooms = sortItem.offer.rooms;
  return ROOMS_VALUES[housingRooms.value](rooms);
};
const filterByGuests = (sortItem) => {
  const guests = sortItem.offer.guests;
  return GUESTS_VALUES[housingGuests.value](guests);
};
const filterByFeatures = (sortItem) => {
  const features = sortItem.offer.features;
  const selectedFeatures = housingFeatures.filter((input) => input.checked);
  return selectedFeatures.every((feature) => features && features.includes(feature.value));
};

const onFiltersFormChange = (cb) => {
  filtersForm.addEventListener('change', () => {
    map.clearMarkers();
    cb();
  });
};

function getFiltersData(advertisments) {
  return advertisments.filter((advertisment) =>
    filterByHousingType(advertisment) &&
    filterByPrice(advertisment) &&
    filterByRooms(advertisment) &&
    filterByGuests(advertisment) &&
    filterByFeatures(advertisment));
}

const disableMapForm = () => {
  filtersForm.classList.add('map__filters--disabled');
  filtersFormElements.forEach((item) => {
    item.disabled = true;
  });
};

const activateMapForm = () => {
  filtersForm.classList.remove('map__filters--disabled');
  filtersFormElements.forEach((item) => {
    item.disabled = false;
  });
};

disableMapForm();

getData((activateMapForm));

export {filtersForm, getFiltersData,onFiltersFormChange};
