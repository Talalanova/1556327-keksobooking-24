const HOUSE_TYPES = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  palace : 'Дворец',
  hotel : 'Отель',
};

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('article');

const getAdTemplate = (item) => {
  const advertisment = template.cloneNode(true);

  const title = advertisment.querySelector('.popup__title');
  item.offer.title ? title.textContent = item.offer.title : title.classList.add('visually-hidden');
  const adress = advertisment.querySelector('.popup__text--address');
  item.offer.adress ? adress.textContent = item.offer.address : adress.classList.add('visually-hidden');
  const price = advertisment.querySelector('.popup__text--price');
  item.offer.price ? price.textContent = `${item.offer.price} ₽/ночь` : price.classList.add('visually-hidden');
  const avatar = advertisment.querySelector('.popup__avatar');
  item.author.avatar ? avatar.src = item.author.avatar : avatar.classList.add('visually-hidden');
  const capacity = advertisment.querySelector('.popup__text--capacity');
  item.offer.capacity ? capacity.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей` : capacity.classList.add('visually-hidden');
  const textTime = advertisment.querySelector('.popup__text--time');
  item.offer.checkin || item.offer.checkout  ? textTime.textContent = `Заезд после ${item.offer.checkin},выезд после ${item.offer.checkout}` : textTime.classList.add('visually-hidden');
  const description = advertisment.querySelector('.popup__description');
  item.offer.description ? description.textContent = item.offer.description : description.classList.add('visually-hidden');
  const type = advertisment.querySelector('.popup__type');
  item.offer.type ? type.textContent = HOUSE_TYPES[item.offer.type] : type.classList.add('visually-hidden');

  const features = advertisment.querySelector('.popup__features');
  if (item.offer.features) {
    features.innerHTML = item.offer.features.map((feature) => `<li class='popup__feature popup__feature--${feature}'></li>`).join('');
  } else {
    features.classList.add('visually-hidden');
  }

  const photo = advertisment.querySelector('.popup__photos');
  if (item.offer.photos) {
    photo.innerHTML = item.offer.photos.map((src) => `<img src=${src} class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('');
  } else {
    photo.classList.add('visually-hidden');
  }

  return advertisment;
};

export {getAdTemplate};
