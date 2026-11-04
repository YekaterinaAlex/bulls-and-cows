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
});
