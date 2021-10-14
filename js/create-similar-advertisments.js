import {similarAdvertisments} from './get-similar-advertisments.js';

const advertismentContainer = document.querySelector('.map__canvas');

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('article');

for (let i = 0; i < similarAdvertisments.length; i++) {
  const advertisment = template.cloneNode(true);

  const avatar = advertisment.querySelector('.popup__avatar');
  avatar.src = similarAdvertisments[i].author.avatar;

  const address = advertisment.querySelector('.popup__text--address');
  address.textContent = similarAdvertisments[i].offer.address;

  const price = advertisment.querySelector('.popup__text--price');
  price.textContent = similarAdvertisments[i].offer.price;

  const type = advertisment.querySelector('.popup__type');
  type.textContent = similarAdvertisments[i].offer.type;

  const title = advertisment.querySelector('.popup__title');
  title.textContent = similarAdvertisments[i].offer.title;

  const description = advertisment.querySelector('.popup__description');
  description.textContent = similarAdvertisments[i].offer.description;


  advertismentContainer.appendChild(advertisment);
}

console.log(advertismentContainer);


// similarAdvertisments.forEach((element) => {

// });
