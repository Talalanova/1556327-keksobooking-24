import {renderMarkers} from './map.js';
import {showSuccessMessage} from './show-success-message.js';
import {setUserFormSubmit} from './advertisment-form.js';
import {getData} from './api.js';

getData((data) => {
  renderMarkers(data);
});

setUserFormSubmit(showSuccessMessage);
