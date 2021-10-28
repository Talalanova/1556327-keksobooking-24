import {isEscapeKey} from './util.js';

const templateFragment = document.querySelector('#success').content;
const template = templateFragment.querySelector('div');
const successMessage = template.cloneNode(true);
const messageContainer = document.querySelector('.map');

const showSuccessMessage = () => {
  messageContainer.appendChild(successMessage);
};

window.addEventListener('click', () => {
  messageContainer.removeChild(successMessage);
});

window.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    messageContainer.removeChild(successMessage);
  }
});

export {showSuccessMessage};
