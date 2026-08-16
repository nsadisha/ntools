import { DateAndTimeService } from './date-and-time.service';

describe('DateAndTimeService', () => {
  let service: DateAndTimeService;

  beforeEach(() => {
    service = new DateAndTimeService();
  });

  describe('calculateDateDifference', () => {
    // Exactly 400 days apart, chosen so every partial below is a
    // non-zero integer with no floating-point rounding surprises.
    const fromDate = 0;
    const toDate = 400 * 24 * 60 * 60 * 1000;

    it('should compute the years/months/days partial', () => {
      const [result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ years: 1, months: 1, days: 5 });
    });

    it('should compute the months/days partial', () => {
      const [, result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ months: 13, days: 10 });
    });

    it('should compute the weeks/days partial', () => {
      const [, , result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ weeks: 57, days: 1 });
    });

    it('should compute the days-only partial', () => {
      const [, , , result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ days: 400 });
    });

    it('should compute the hours partial', () => {
      const [, , , , result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ hours: 9600 });
    });

    it('should compute the minutes partial', () => {
      const [, , , , , result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ minutes: 576000 });
    });

    it('should compute the seconds partial', () => {
      const [, , , , , , result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ seconds: 34560000 });
    });

    it('should compute the milliseconds partial', () => {
      const [, , , , , , , result] = service.calculateDateDifference(fromDate, toDate);
      expect(result).toEqual({ milliseconds: 34560000000 });
    });
  });

  describe('formatDateDifference', () => {
    it('should join every non-zero field with its capitalized key', () => {
      expect(service.formatDateDifference({ years: 1, months: 2, days: 0 })).toBe('1 Years, 2 Months');
    });

    it('should return an empty string when every field is zero', () => {
      expect(service.formatDateDifference({ years: 0, months: 0, days: 0 })).toBe('');
    });

    it('should handle a single non-zero field', () => {
      expect(service.formatDateDifference({ hours: 5 })).toBe('5 Hours');
    });
  });
});
