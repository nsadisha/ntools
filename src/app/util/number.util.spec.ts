import { ApplicationConfig } from '../config/application.config';
import { validateRoundNumber } from './number.util';

describe('number.util', () => {
  describe('validateRoundNumber', () => {
    it('should clamp values below MIN_ROUND_DIGITS up to the minimum', () => {
      expect(validateRoundNumber(-1)).toBe(ApplicationConfig.MIN_ROUND_DIGITS);
    });

    it('should clamp values above MAX_ROUND_DIGITS down to the maximum', () => {
      expect(validateRoundNumber(20)).toBe(ApplicationConfig.MAX_ROUND_DIGITS);
    });

    it('should pass through a value already within range', () => {
      expect(validateRoundNumber(5)).toBe(5);
    });

    it('should pass through the exact minimum boundary', () => {
      expect(validateRoundNumber(ApplicationConfig.MIN_ROUND_DIGITS)).toBe(ApplicationConfig.MIN_ROUND_DIGITS);
    });

    it('should pass through the exact maximum boundary', () => {
      expect(validateRoundNumber(ApplicationConfig.MAX_ROUND_DIGITS)).toBe(ApplicationConfig.MAX_ROUND_DIGITS);
    });
  });
});
