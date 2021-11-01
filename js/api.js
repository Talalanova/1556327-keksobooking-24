import {showAlert} from './util.js';
import {mainMarker} from './map.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера. Попробуйте позже.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Проверьте обязательные поля и попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Проверьте обязательные поля и попробуйте ещё раз');
    });
};

export {getData,sendData,mainMarker};
