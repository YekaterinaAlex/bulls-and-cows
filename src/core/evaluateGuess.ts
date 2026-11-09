export const evaluateGuess = (secret: string, guess: string): { bulls: number; cows: number } => {
  const bulls = [...guess].filter((digit, index) => digit === secret[index]).length;
  const cows = [...guess].filter(
    (digit, index) => digit !== secret[index] && secret.includes(digit),
  ).length;
  return {
    bulls,
    cows,
  };
};
