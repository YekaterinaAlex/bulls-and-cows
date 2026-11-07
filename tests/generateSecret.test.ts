import { describe, it, expect } from 'vitest';
import { generateSecret } from '../src/core/generateSecret';

describe('generateSecret', () => {
  it('should generate a secret with requested length', () => {
    const secret = generateSecret(4, 10, () => 0);

    expect(secret).toHaveLength(4);
  });

  it('should generate unique digits', () => {
    const secret = generateSecret(4, 10, () => 0);
    expect(new Set(secret).size).toBe(4);
  });

  it('should allow leading zeros', () => {
    const secret = generateSecret(4, 10, () => 0);
    expect(secret[0]).toBe('0');
  });

  it('should support binary system', () => {
    const secret = generateSecret(2, 2, () => 0);
    expect(secret).toBe('01');
  });

  it('should support hexadecimal numbers', () => {
    const secret = generateSecret(6, 16, () => 0.5);
    expect(secret).toMatch(/^[0-9a-f]{6}$/);
  });
});
