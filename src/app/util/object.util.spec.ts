import { isAllValuesEqualTo, removeDuplicates } from './object.util';

describe('object.util', () => {
  describe('isAllValuesEqualTo', () => {
    it('should return true when every value matches the text', () => {
      expect(isAllValuesEqualTo({ a: '0', b: '0' }, '0')).toBe(true);
    });

    it('should return false when at least one value does not match', () => {
      expect(isAllValuesEqualTo({ a: '0', b: '1' }, '0')).toBe(false);
    });

    it('should return true (vacuously) for an empty object', () => {
      expect(isAllValuesEqualTo({}, '0')).toBe(true);
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicate values from an array', () => {
      expect(removeDuplicates([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('should return an equivalent array when there are no duplicates', () => {
      expect(removeDuplicates(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should return an empty array for an empty input', () => {
      expect(removeDuplicates([])).toEqual([]);
    });
  });
});
