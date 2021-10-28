import './advertisment-form.js';
import {renderMarkers} from './map.js';
//import {clearMarkers} from './map.js';
import {showSuccessMessage} from './show-success-message.js';
import {setUserFormSubmit} from './advertisment-form.js';

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => {
    renderMarkers(data);
  });

setUserFormSubmit(showSuccessMessage);
