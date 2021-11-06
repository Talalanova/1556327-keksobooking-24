import {renderMarkers} from './map-set.js';
import {setUserFormSubmit} from './advertisment-form.js';
import {getData} from './api.js';
import {getAdTemplate} from './draw-advertisment.js';
import {typeCLick, guestsClick, roomsClick} from './map-set.js';

getData((advertisments) => {
  renderMarkers(advertisments,getAdTemplate);
  typeCLick(() => renderMarkers(advertisments,getAdTemplate));
  guestsClick(() => renderMarkers(advertisments,getAdTemplate));
  roomsClick(() => renderMarkers(advertisments,getAdTemplate));
});


setUserFormSubmit();

