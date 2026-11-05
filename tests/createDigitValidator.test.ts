import { describe, it, expect } from 'vitest';
import { createDigitValidator } from '../src/core/createDigitValidator';

describe('createDigitValidator', () => {
  it('should accept valid binary digits', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
    expect(isBinaryDigit('2')).toBe(false);
  });

  it('should accept uppercase and lowercase hexadecimal digits', () => {
    const isHexDigit = createDigitValidator(16);
    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('A')).toBe(true);
    expect(isHexDigit('f')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
    expect(isHexDigit('g')).toBe(false);
  });

  it('should validate octal digits', () => {
    const isOctalDigit = createDigitValidator(8);
    expect(isOctalDigit('0')).toBe(true);
    expect(isOctalDigit('7')).toBe(true);
    expect(isOctalDigit('8')).toBe(false);
    expect(isOctalDigit('9')).toBe(false);
  });

  it('should validate dec digits', () => {
    const isDecDigit = createDigitValidator(10);
    expect(isDecDigit('0')).toBe(true);
    expect(isDecDigit('5')).toBe(true);
    expect(isDecDigit('9')).toBe(true);
    expect(isDecDigit('a')).toBe(false);
    expect(isDecDigit('A')).toBe(false);
  });

  it('should reject empty strings', () => {
    const isDecDigit = createDigitValidator(10);
    expect(isDecDigit('')).toBe(false);
  });

  it('should reject multiple characters', () => {
    const isDecDigit = createDigitValidator(10);

    expect(isDecDigit('12')).toBe(false);
    expect(isDecDigit('abc')).toBe(false);
  });
});
