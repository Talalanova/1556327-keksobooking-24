import {renderMarkers} from './map-set.js';
import {setUserFormSubmit} from './advertisment-form.js';
import {getData} from './api.js';
import {getAdTemplate} from './draw-advertisment.js';

getData((advertisments) => {
  renderMarkers(advertisments,getAdTemplate);
});

setUserFormSubmit();

