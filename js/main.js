import {getAdvertisment} from './get-advertisment.js';
import './advertisment-form.js';
import {renderMarkers} from './map.js';
import {clearMarkers} from './map.js';

renderMarkers(getAdvertisment(10));

