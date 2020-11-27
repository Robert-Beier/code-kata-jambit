const getNextNumber = (n: number) => {
  return n.toString()
    .split('')
    .reduce(
        (sum, digit) => sum + Math.pow(parseInt(digit), 2),
        0);
}

export const isNumberHappy = (n: number) => {
  let currentNumber = n;
  const history = new Set();

  while (true) {
    history.add(currentNumber)
    currentNumber = getNextNumber(currentNumber);

    if (currentNumber === 1) {
      return true;
    } else if (history.has(currentNumber)) {
      return false;
    }
  }
}

const getFirstXHappyNumbers = (numberOfHappyNumbers: number) => {
  const happyNumbers = [];

  for (let n = 0; happyNumbers.length < numberOfHappyNumbers; n++) {
    if (isNumberHappy(n)) {
      happyNumbers.push(n);
    }
  }

  return happyNumbers;
}

console.log(getFirstXHappyNumbers(8));

