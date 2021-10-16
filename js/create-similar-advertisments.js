import {getSimilarAdvertisments} from './get-similar-advertisments.js';

const similarAdvertisments = getSimilarAdvertisments(10);

const TYPE = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  palace : 'Дворец',
  hotel : 'Отель',
};

const advertismentContainer = document.querySelector('.map__canvas');

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('article');

for (let i = 0; i < similarAdvertisments.length; i++) {
  const advertisment = template.cloneNode(true);

  const title = advertisment.querySelector('.popup__title');
  title.textContent = similarAdvertisments[i].offer.title;

  const address = advertisment.querySelector('.popup__text--address');
  address.textContent = similarAdvertisments[i].offer.address;

  const price = advertisment.querySelector('.popup__text--price');
  price.textContent = `${similarAdvertisments[i].offer.price} ₽/ночь`;

  const type = advertisment.querySelector('.popup__type');
  const englishType = similarAdvertisments[i].offer.type;
  type.textContent =TYPE[englishType];

  const roomsForGuests = advertisment.querySelector('.popup__text--capacity');
  roomsForGuests.textContent = `${similarAdvertisments[i].offer.rooms} комнаты для ${similarAdvertisments[i].offer.guests} гостей`;

  const checkinCheckout = advertisment.querySelector('.popup__text--time');
  checkinCheckout.textContent = `Заезд после ${similarAdvertisments[i].offer.checkin},выезд после ${similarAdvertisments[i].offer.checkout}`;

  const featuresContainer = advertisment.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary =  similarAdvertisments[i].offer.features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  const description = advertisment.querySelector('.popup__description');
  description.textContent = similarAdvertisments[i].offer.description;

  const photosContainer = advertisment.querySelector('.popup__photos');
  const photo = photosContainer.querySelector('.popup__photo');
  photo.src = similarAdvertisments[i].offer.photos[0];
  for (let j = 1; j < similarAdvertisments[i].offer.photos.length - 1; j++) {
    const duplicatePhoto = photo.cloneNode(true);
    duplicatePhoto.src = similarAdvertisments[i].offer.photos[j];
    photosContainer.appendChild(duplicatePhoto);
  }

  const avatar = advertisment.querySelector('.popup__avatar');
  avatar.src = similarAdvertisments[i].author.avatar;

  advertismentContainer.appendChild(advertisment);
}

window.console.log(advertismentContainer);
