import {renderMarkers} from './map-set.js';
import {setUserFormSubmit} from './advertisment-form.js';
import {getData} from './api.js';
import {getAdTemplate} from './draw-advertisment.js';
import {onFiltersFormChange,getFiltersData} from './map-filters.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((advertisments) => {
  renderMarkers(advertisments,getAdTemplate);
  const onFilter = () => {
    const filteredAdvertisments  = getFiltersData(advertisments);
    renderMarkers(filteredAdvertisments,getAdTemplate);
  };
  onFiltersFormChange(debounce(() => onFilter()),RERENDER_DELAY);
});

setUserFormSubmit();

