import {makeMap} from './make-map-object.js';

const TOKIO_CENTER = {
  lat: 35.6109,
  lng: 139.6509,
};

const MAX_ADVERTISMENTS = 10;

const map = makeMap(TOKIO_CENTER);

const renderMarkers = (advertisments,template) => {
  map.setSecondaryMarkers(advertisments.slice(0, MAX_ADVERTISMENTS),template);
};

export {map,renderMarkers,TOKIO_CENTER};
