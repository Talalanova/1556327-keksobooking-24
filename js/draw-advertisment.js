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

const getAdTemplate = (item) => {
  const advertisment = template.cloneNode(true);

  advertisment.querySelector('.popup__title').textContent = item.offer.title;
  advertisment.querySelector('.popup__text--address').textContent = item.offer.address;
  advertisment.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  advertisment.querySelector('.popup__avatar').src = item.author.avatar;
  advertisment.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  advertisment.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin},выезд после ${item.offer.checkout}`;
  advertisment.querySelector('.popup__description').textContent = item.offer.description;
  advertisment.querySelector('.popup__type').textContent =TYPE[item.offer.type];
  advertisment.querySelector('.popup__features').innerHTML = item.offer.features.map((feature) => `<li class='popup__feature popup__feature--${feature}'></li>`).join('');
  advertisment.querySelector('.popup__photos').innerHTML = item.offer.photos.map((src) => `<img src=${src} class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('');

  // const featuresContainer = advertisment.querySelector('.popup__features');
  // const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  // featuresList.forEach((featuresListItem) => {
  //   const isNecessary =  item.offer.features.some(
  //     (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
  //   );
  //   if (!isNecessary) {
  //     featuresListItem.remove();
  //   }
  // });

  return advertisment;
};

const drawAdvertisments = (data) => {
  data.forEach((element) => {
    advertismentContainer.appendChild(getAdTemplate(element));
  });
};

export {drawAdvertisments};
