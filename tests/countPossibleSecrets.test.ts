import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from '../src/core/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('should count possible binary secrets', () => {
    const result = countPossibleSecrets(2, 2);

    expect(result).toBe(2);
  });

  it('should count possible oct secrets', () => {
    const result = countPossibleSecrets(4, 8);
    expect(result).toBe(1680);
  });

  it('should count possible decimal secrets', () => {
    const result = countPossibleSecrets(4, 10);

    expect(result).toBe(5040);
  });

  it('should count possible hexadecimal secrets', () => {
    const result = countPossibleSecrets(4, 16);

    expect(result).toBe(43680);
  });

  it('should count possible secrets with maximum length', () => {
    const result = countPossibleSecrets(6, 10);

    expect(result).toBe(151200);
  });

  it('should reject unsupported number systems', () => {
    expect(() => countPossibleSecrets(4, 5)).toThrow(RangeError);
  });

  it('should reject invalid secret lengths', () => {
    expect(() => countPossibleSecrets(1, 10)).toThrow(RangeError);
    expect(() => countPossibleSecrets(7, 10)).toThrow(RangeError);
    expect(() => countPossibleSecrets(4, 2)).toThrow(RangeError);
  });
});
