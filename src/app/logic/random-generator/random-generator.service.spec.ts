import { RandomGeneratorService } from './random-generator.service';
import { validRandomStringTypes } from '../../config/random/radom.config';

describe('RandomGeneratorService', () => {
  let service: RandomGeneratorService;

  beforeEach(() => {
    service = new RandomGeneratorService();
  });

  describe('generateRandomString', () => {
    it('should generate a hex string of the requested length', () => {
      const result = service.generateRandomString({ length: 12, type: 'hex' });
      expect(result).toMatch(/^[0-9a-f]{12}$/i);
    });

    it('should generate a numeric string of the requested length', () => {
      const result = service.generateRandomString({ length: 8, type: 'numeric' });
      expect(result).toMatch(/^[0-9]{8}$/);
    });
  });

  describe('getValidRandomStringTypes', () => {
    it('should return the configured string types', () => {
      expect(service.getValidRandomStringTypes()).toEqual(validRandomStringTypes);
    });
  });

  describe('generateRandomInteger', () => {
    it('should return the minimum bound when Math.random returns 0', () => {
      spyOn(Math, 'random').and.returnValue(0);
      expect(service.generateRandomInteger(5, 15)).toBe(5);
    });

    it('should return the maximum bound when Math.random returns just under 1', () => {
      spyOn(Math, 'random').and.returnValue(0.999999999);
      expect(service.generateRandomInteger(5, 15)).toBe(15);
    });

    it('should return a mid-range value for a mid-range random value', () => {
      spyOn(Math, 'random').and.returnValue(0.5);
      expect(service.generateRandomInteger(0, 10)).toBe(5);
    });
  });
});
