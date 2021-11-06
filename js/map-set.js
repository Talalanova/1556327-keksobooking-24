import {makeMap} from './make-map-object.js';

const TOKIO_CENTER = {
  lat: 35.4100,
  lng: 139.4130,
};

const map = makeMap(TOKIO_CENTER);

const typeInput = document.querySelector('#housing-type');
let selectedType = typeInput.value;

const roomsInput = document.querySelector('#housing-rooms');
let selectedRooms = roomsInput.value;

const guestsInput = document.querySelector('#housing-guests');
let selectedGuests = guestsInput.value;

const renderMarkers = (advertisments,template) => {
  const filteredAds = advertisments.filter((ad) => (
    (selectedType === 'any' || ad.offer.type === selectedType) &&
    (selectedGuests === 'any' || ad.offer.guests === selectedGuests) &&
    (selectedRooms === 'any' || ad.offer.rooms === selectedRooms)
  ));
  map.setSecondaryMarkers(filteredAds,template);
};

export const typeCLick = (cb) => {
  typeInput.addEventListener('input', () => {
    map.clearMarkers();
    selectedType = typeInput.value;
    cb();
  });
};

export const roomsClick = (cb) => {
  roomsInput.addEventListener('input', () => {
    map.clearMarkers();
    selectedRooms = roomsInput.value;
    cb();
  });
};

export const guestsClick = (cb) => {
  guestsInput.addEventListener('input', () => {
    map.clearMarkers();
    selectedGuests = guestsInput.value;
    cb();
  });
};

export {map,renderMarkers,TOKIO_CENTER};
