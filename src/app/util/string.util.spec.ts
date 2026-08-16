import { firstLetterToUpperCase, isNullOrEmpty, toFixed } from './string.util';

describe('string.util', () => {
  describe('toFixed', () => {
    it('should default to 2 fraction digits', () => {
      expect(toFixed(1.23456)).toBe('1.23');
    });

    it('should use the supplied fraction digits', () => {
      expect(toFixed(1.23456, 3)).toBe('1.235');
    });

    it('should support 0 fraction digits', () => {
      expect(toFixed(1.6, 0)).toBe('2');
    });
  });

  describe('firstLetterToUpperCase', () => {
    it('should capitalize the first letter of a lowercase word', () => {
      expect(firstLetterToUpperCase('hello')).toBe('Hello');
    });

    it('should leave an already-uppercase first letter unchanged', () => {
      expect(firstLetterToUpperCase('World')).toBe('World');
    });

    it('should handle a single-character string', () => {
      expect(firstLetterToUpperCase('a')).toBe('A');
    });
  });

  describe('isNullOrEmpty', () => {
    it('should return true for null', () => {
      expect(isNullOrEmpty(null as unknown as string)).toBe(true);
    });

    it('should return true for an empty string', () => {
      expect(isNullOrEmpty('')).toBe(true);
    });

    it('should return true for a whitespace-only string', () => {
      expect(isNullOrEmpty('   ')).toBe(true);
    });

    it('should return false for a non-empty string', () => {
      expect(isNullOrEmpty('text')).toBe(false);
    });
  });
});
