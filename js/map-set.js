import {makeMap} from './make-map-object.js';

const typeInput = document.querySelector('#housing-type');

typeInput.addEventListener('change', () => {

});

const TOKIO_CENTER = {
  lat: 35.4100,
  lng: 139.4130,
};

const map = makeMap(TOKIO_CENTER);

const renderMarkers = (advertisments,template) => {
  const filteredAds = advertisments.filter((ad) => ad.offer.type === typeInput.value);
  map.setSecondaryMarkers(filteredAds,template);
};

export {map,renderMarkers,TOKIO_CENTER};
