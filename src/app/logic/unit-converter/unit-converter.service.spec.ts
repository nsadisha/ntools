import { UnitConverterService } from './unit-converter.service';

describe('UnitConverterService', () => {
  let service: UnitConverterService;

  beforeEach(() => {
    service = new UnitConverterService();
  });

  describe('getMeasures', () => {
    it('should return every measure with a capitalized label', () => {
      const result = service.getMeasures();
      expect(result).toContain({ value: 'length', label: 'Length' });
    });
  });

  describe('getMeasurePossibilities', () => {
    it('should list the units available for a measure', () => {
      const result = service.getMeasurePossibilities('length');
      expect(result.some(unit => unit.abbr === 'm')).toBe(true);
    });
  });

  describe('getConversionPossibilities', () => {
    it('should describe every unit a given unit can convert to', () => {
      const result = service.getConversionPossibilities('m');
      expect(result.some(unit => unit.abbr === 'km')).toBe(true);
    });
  });

  describe('convert', () => {
    it('should convert a value between two units', () => {
      expect(service.convert(1000, 'm', 'km')).toBe(1);
    });
  });

  describe('convertToBest', () => {
    it('should convert a value to its best-fit unit', () => {
      expect(service.convertToBest(1000, 'm')).toEqual({
        val: 1,
        unit: 'km',
        singular: 'Kilometer',
        plural: 'Kilometers',
      });
    });
  });

  describe('formatResult', () => {
    it('should format a value/from/result/to into a conversion string', () => {
      expect(service.formatResult(1000, 'm', 'km', 1, 2)).toBe('1000 m = 1.00 km');
    });

    it('should respect the requested round digits', () => {
      expect(service.formatResult(1000, 'm', 'km', 1.23456, 3)).toBe('1000 m = 1.235 km');
    });
  });

  describe('formatBestResult', () => {
    it('should format a value/from against a best-fit result', () => {
      expect(service.formatBestResult(1000, 'm', { val: 1, unit: 'km' })).toBe('1000 m = 1 km');
    });

    it('should render undefined fields when there is no best result', () => {
      expect(service.formatBestResult(1000, 'm', null)).toBe('1000 m = undefined undefined');
    });
  });

  describe('shouldShowBestResult', () => {
    it('should return false when there is no best result', () => {
      expect(service.shouldShowBestResult('km', null)).toBe(false);
    });

    it('should return false when the target unit already matches the best unit', () => {
      expect(service.shouldShowBestResult('km', { val: 1, unit: 'km' })).toBe(false);
    });

    it('should return true when the target unit differs from the best unit', () => {
      expect(service.shouldShowBestResult('m', { val: 1, unit: 'km' })).toBe(true);
    });
  });
});
