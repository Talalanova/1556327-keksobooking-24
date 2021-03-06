const mainIconSize = [52, 52];
const mainIconAnchor = [26, 52];
const secondaryIconSize = [40, 40];
const secondaryIconAnchor = [20, 40];

const makeMap = (mainMarkerCoordinates) =>
{
  const map = L.map('map-canvas')
    .setView(mainMarkerCoordinates, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

  const mainIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: mainIconSize,
    iconAnchor: mainIconAnchor,
  });

  const mainMarker = L.marker(
    mainMarkerCoordinates,
    {
      draggable: true,
      icon: mainIcon,
    },
  );
  mainMarker.addTo(map);

  const markerGroup = L.layerGroup().addTo(map);

  return {
    onLoad: (func) => mainMarker.on('load', func),
    getMainMarkerPos: () => mainMarker.getLatLng(),
    setMainMarkerPos: (pos) => mainMarker.setLatLng(pos),
    setSecondaryMarkers: (advertisments,template) => {
      advertisments
        .forEach((ad) => {
          const lat = ad.location.lat;
          const lng = ad.location.lng;
          const icon = L.icon({
            iconUrl: 'img/pin.svg',
            iconSize: secondaryIconSize,
            iconAnchor: secondaryIconAnchor,
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
            .bindPopup(template(ad));
        });
    },
    clearMarkers: () => markerGroup.clearLayers(),
    onMainMarkerMoveEnd: (func) => mainMarker.on('moveend', (evt) => func(evt.target.getLatLng())),
    closePopup: () => markerGroup.closePopup(),
  };
};

export {makeMap};

