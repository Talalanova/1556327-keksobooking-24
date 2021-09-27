// Функция, возвращающая целое число в диапазоне от нуля до заданного значения включительно

function getRandomInRange (min,max) {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max-min+1)+min);
  }
  console.log('Пожалуйста, введите корректный диапазон значений');
}

getRandomInRange(0,12);

// Функция, возвращающая случайное число с плавающей точкой в диапазоне от нуля включительно до заданного значения

function getRandomFloatInRange (min,max,n) {
  if (max > min && min >= 0) {
    return Number((Math.random() * (max-min)+min).toFixed(n));
  }
  console.log('Пожалуйста, введите корректный диапазон значений');
}

getRandomFloatInRange (0, 5, 3);
