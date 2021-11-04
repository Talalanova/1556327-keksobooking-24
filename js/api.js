import {showAlert} from './util.js';


const serverSend = 'https://24.javascript.pages.academy/keksobooking1';
const serverGet = 'https://24.javascript.pages.academy/keksobooking/data1';


const getData = (onSuccess) => {
  fetch(serverGet)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => showAlert('Не удалось загрузить данные с сервера. Попробуйте позже.'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    serverSend,
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
    .catch(() => onFail('Не удалось отправить форму. Проверьте обязательные поля и попробуйте ещё раз'));
};

export {getData,sendData};
