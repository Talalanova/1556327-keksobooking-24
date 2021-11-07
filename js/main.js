import {renderMarkers} from './map-set.js';
import {setUserFormSubmit} from './advertisment-form.js';
import {getData} from './api.js';
import {getAdTemplate} from './draw-advertisment.js';
import {typeCLick, roomsClick, guestsClick, priceClick, featuresClick,getFiltersData} from './map-filters.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;


getData((advertisments) => {
  renderMarkers(advertisments,getAdTemplate);
  const onFilter = () => {
    const filteredAdvertisments  = getFiltersData(advertisments);
    renderMarkers(filteredAdvertisments,getAdTemplate);
  };
  typeCLick(debounce(() =>  onFilter()),RERENDER_DELAY);
  guestsClick(debounce(() => onFilter()),RERENDER_DELAY);
  roomsClick(debounce(() => onFilter()),RERENDER_DELAY);
  priceClick(debounce(() => onFilter()),RERENDER_DELAY);
  featuresClick(debounce(() => onFilter()),RERENDER_DELAY);
});


setUserFormSubmit();

