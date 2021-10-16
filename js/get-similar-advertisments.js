const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const maxPrice = 100000;
const maxRooms = 5;
const maxGuests = 10;

const createLocation = () => ({
  lat: _.random(35.65000, 35.70000),
  lng: _.random(139.70000, 139.80000),
});

const createAuthor = (picNumber) => {
  const number = picNumber < 10 ? `0${picNumber}` : picNumber;
  return {
    avatar: `img/avatars/user${number}.png`,
  };
};

const createOffer = (location) => {
  const randomPrice = _.random(1, maxPrice);
  const randomCheckin = CHECKINS[_.random(0, CHECKINS.length -1)];
  return {
    title: 'Сдам квартиру',
    address: `${location.lat},${location.lng}`,
    price: randomPrice,
    type: TYPES[_.random(0,TYPES.length - 1)],
    rooms: _.random(1,maxRooms),
    guests: _.random(1,maxGuests),
    checkin: randomCheckin,
    checkout: CHECKOUTS[_.random(0,CHECKOUTS.length -1)],
    features: (_.shuffle(FEATURES)).slice(0,_.random(1,FEATURES.length -1)),
    description: `Ждем тебя в ${randomCheckin}`,
    photos: (_.shuffle(PHOTOS)).slice(0,_.random(1,PHOTOS.length -1)),
  };
};

const createAdvertisment = (index) => {
  const randomLocation = createLocation();
  const randomOffer = createOffer(randomLocation);
  const randomAuthor = createAuthor(index);
  return {
    author: randomAuthor,
    offer: randomOffer,
    location: randomLocation,
  };
};

const getSimilarAdvertisments = (n) => new Array(n).fill().map((_,index) => createAdvertisment(index + 1 ));

export {getSimilarAdvertisments};