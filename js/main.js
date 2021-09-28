// Функция, возвращающая положительное случайное целое число

function getRandomInRange (min, max) {
  const minAbs = Math.abs(min);
  const maxAbs = Math.abs(max);
  const result = Math.floor(Math.random() * (Math.max(maxAbs, minAbs) - Math.min(maxAbs, minAbs) + 1) + Math.min(maxAbs, minAbs));
  return result;
}

getRandomInRange(0,12);

// Функция, возвращающая положительное случайное число с плавающей точкой

function getRandomFloatInRange (min, max, symbolsAfterDot) {
  const minAbs = Math.abs(min);
  const maxAbs = Math.abs(max);
  const result = Math.random() * (Math.max(maxAbs, minAbs) - Math.min(maxAbs, minAbs)) + Math.min(maxAbs, minAbs);
  return +result.toFixed(symbolsAfterDot);
}

getRandomFloatInRange (0, 5, 3);
