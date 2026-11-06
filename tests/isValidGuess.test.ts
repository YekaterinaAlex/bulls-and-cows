import { describe, it, expect } from 'vitest';
import { isValidGuess } from '../src/core/isValidGuess';

describe('isValidGuess', () => {
  it('should accept the valid decimal guess', () => {
    const result = isValidGuess('1234', 4, 10);
    expect(result).toBe(true);
  });

  it('should reject guesses with incorrect length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);

    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('should reject duplicate digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);

    expect(isValidGuess('1212', 4, 10)).toBe(false);

    expect(isValidGuess('1111', 4, 10)).toBe(false);
  });

  it('should reject invalid characters for decimal system', () => {
    expect(isValidGuess('12a4', 4, 10)).toBe(false);

    expect(isValidGuess('12@4', 4, 10)).toBe(false);

    expect(isValidGuess('12 4', 4, 10)).toBe(false);
  });

  it('should accept valid hexadecimal guesses', () => {
    expect(isValidGuess('A1bF', 4, 16)).toBe(true);
    expect(isValidGuess('a1Bf', 4, 16)).toBe(true);
  });

  it('should reject duplicate hexadecimal digits regardless of case', () => {
    expect(isValidGuess('Aa12', 4, 16)).toBe(false);
  });

  it('should reject invalid hexadecimal characters', () => {
    expect(isValidGuess('12g4', 4, 16)).toBe(false);
  });

  it('should validate binary guesses', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('10', 2, 2)).toBe(true);

    expect(isValidGuess('02', 2, 2)).toBe(false);
  });

  it('should validate octal guesses', () => {
    expect(isValidGuess('1270', 4, 8)).toBe(true);

    expect(isValidGuess('1280', 4, 8)).toBe(false);
  });
});
