import {isEscapeKey} from './util.js';

const templateFragment = document.querySelector('#success').content;
const template = templateFragment.querySelector('div');
const successMessage = template.cloneNode(true);
const messageContainer = document.querySelector('.map');

const showSuccessMessage = () => {
  messageContainer.appendChild(successMessage);

  window.addEventListener('click', () => {
    successMessage.parentNode.removeChild(successMessage);
  },
  {once: true});

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successMessage.parentNode.removeChild(successMessage);
    }
  },
  {once: true});
};

export {showSuccessMessage};
