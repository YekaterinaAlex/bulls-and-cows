export const countPossibleSecrets = (length: number, base: number): number => {
  const validBases = [2, 8, 10, 16];

  if (!validBases.includes(base)) {
    throw new RangeError('Unsupported number system');
  }

  if (!Number.isInteger(length) || length < 2 || length > 6 || length > base) {
    throw new RangeError('Invalid secret length');
  }

  const cache = new Map<number, number>();

  const count = (remaining: number): number => {
    if (remaining === 0) {
      return 1;
    }

    const cachedResult = cache.get(remaining);

    if (cachedResult !== undefined) {
      return cachedResult;
    }

    const result = (base - length + remaining) * count(remaining - 1);

    cache.set(remaining, result);

    return result;
  };

  return count(length);
};
