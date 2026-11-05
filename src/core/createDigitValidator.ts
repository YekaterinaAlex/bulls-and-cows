const DIGITS = '0123456789abcdef';

export const createDigitValidator = (base: number): ((char: string) => boolean) => {
  const allowedDigits = DIGITS.slice(0, base);

  return (char: string): boolean => {
    return char.length === 1 && allowedDigits.includes(char.toLowerCase());
  };
};
