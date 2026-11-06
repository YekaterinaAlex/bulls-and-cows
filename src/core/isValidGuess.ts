import { createDigitValidator } from './createDigitValidator.js';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  const validBases = [2, 8, 10, 16];

  if (!validBases.includes(base)) {
    return false;
  }

  if (!Number.isInteger(length) || length < 2 || length > 6 || length > base) {
    return false;
  }

  if (guess.length !== length) {
    return false;
  }

  const normalizedGuess = guess.toLowerCase();

  if (new Set(normalizedGuess).size !== length) {
    return false;
  }

  const isValidDigit = createDigitValidator(base);

  if (![...normalizedGuess].every(isValidDigit)) {
    return false;
  }

  return true;
};
