import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../src/core/evaluateGuess';

describe('evaluateGuess', () => {
  it('should count bulls and cows correctly', () => {
    const result = evaluateGuess('1234', '1354');
    expect(result).toEqual({
      bulls: 2,
      cows: 1,
    });
  });

  it('should return all bulls when guess matches secret', () => {
    const result = evaluateGuess('1234', '1234');

    expect(result).toEqual({
      bulls: 4,
      cows: 0,
    });
  });

  it('should return zero bulls and cows when no digits match', () => {
    const result = evaluateGuess('1234', '5678');

    expect(result).toEqual({
      bulls: 0,
      cows: 0,
    });
  });

  it('should return all cows when digits are in wrong positions', () => {
    const result = evaluateGuess('1234', '4321');

    expect(result).toEqual({
      bulls: 0,
      cows: 4,
    });
  });

  it('should evaluate hexadecimal digits correctly', () => {
    const result = evaluateGuess('a1b2', 'a2b3');

    expect(result).toEqual({
      bulls: 2,
      cows: 1,
    });
  });
});
