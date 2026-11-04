const DIGITS = '0123456789abcdef';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  const availableDigits = DIGITS.slice(0, base).split('');

  if (![2, 8, 10, 16].includes(base)) {
    throw new RangeError('Unsupported number system');
  }

  if (!Number.isInteger(length) || length < 2 || length > 6 || length > base) {
    throw new RangeError('Invalid secret length');
  }

  let secret = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(random() * availableDigits.length);
    const selectedDigit = availableDigits.splice(randomIndex, 1)[0];
    secret += selectedDigit;
  }

  return secret;
};
