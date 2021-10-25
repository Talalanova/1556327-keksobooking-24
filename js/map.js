// import {disableForm} from './advertisment-form.js';
import {activateForm} from './advertisment-form.js';
import {getAdTemplate} from './draw-advertisment.js';

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.4200,
    lng: 139.2530,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.4200,
    lng: 139.2530,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

const address = document.querySelector('#address');

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
});

const markerGroup = L.layerGroup().addTo(map);

const renderMarkers = (advertisments) => {
  advertisments.forEach((ad) => {
    const lat = ad.location.lat;
    const lng = ad.location.lng;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(getAdTemplate(ad));
  });
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};

export {renderMarkers};
export {clearMarkers};

