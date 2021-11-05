import {makeMap} from './make-map-object.js';

const TOKIO_CENTER = {
  lat: 35.4100,
  lng: 139.4130,
};

const map = makeMap(TOKIO_CENTER);

const renderMarkers = (advertisments,template) => {
  map.setSecondaryMarkers(advertisments,template);
};

export {map,renderMarkers,TOKIO_CENTER};
