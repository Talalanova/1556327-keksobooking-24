import {createAdvertisment} from './createAdvertisment.js';

const similarAdvertisments = new Array(10).fill().map((_,index) => createAdvertisment(index + 1 ));

window.console.log(similarAdvertisments);
