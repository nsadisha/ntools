import { RandomStringGeneratorComponent } from './random-string-generator.component';
import { RandomGeneratorService } from '../../../logic/random-generator/random-generator.service';
import { validRandomStringTypes } from '../../../config/random/radom.config';

describe('RandomStringGeneratorComponent', () => {
  let randomGeneratorServiceSpy: jasmine.SpyObj<RandomGeneratorService>;
  let component: RandomStringGeneratorComponent;

  beforeEach(() => {
    randomGeneratorServiceSpy = jasmine.createSpyObj<RandomGeneratorService>('RandomGeneratorService', [
      'getValidRandomStringTypes',
      'generateRandomString',
    ]);
    randomGeneratorServiceSpy.getValidRandomStringTypes.and.returnValue(validRandomStringTypes);
    randomGeneratorServiceSpy.generateRandomString.and.returnValue('abc123');

    component = new RandomStringGeneratorComponent(randomGeneratorServiceSpy);
  });

  it('should load the available string types on construction', () => {
    expect(component['randomStringTypes']).toEqual(validRandomStringTypes);
  });

  describe('stringOptions', () => {
    it('should include only length when neither type nor characters are set', () => {
      component['formGroup'].setValue({ length: 12, type: null, characters: null });
      expect(component.stringOptions).toEqual({ length: 12 });
    });

    it('should omit length when it is falsy', () => {
      component['formGroup'].setValue({ length: 0, type: 'hex', characters: null });
      expect(component.stringOptions).toEqual({ type: 'hex' });
    });

    it('should include type over characters when both could apply', () => {
      component['formGroup'].setValue({ length: 12, type: 'hex', characters: 'abc' });
      expect(component.stringOptions).toEqual({ length: 12, type: 'hex' });
    });

    it('should include characters when type is not set', () => {
      component['formGroup'].setValue({ length: 12, type: null, characters: 'abc' });
      expect(component.stringOptions).toEqual({ length: 12, characters: 'abc' });
    });
  });

  describe('showAdditionalOptions', () => {
    it('should be true when no type is selected', () => {
      component['formGroup'].controls.type.setValue(null);
      expect(component.showAdditionalOptions).toBe(true);
    });

    it('should be false when a type is selected', () => {
      component['formGroup'].controls.type.setValue('hex');
      expect(component.showAdditionalOptions).toBe(false);
    });
  });

  it('should generate a random string using the current options', () => {
    component['formGroup'].setValue({ length: 12, type: 'hex', characters: null });

    component.generate();

    expect(component['isFormSubmitted']).toBe(true);
    expect(randomGeneratorServiceSpy.generateRandomString).toHaveBeenCalledWith({ length: 12, type: 'hex' } as any);
    expect(component['randomString']).toBe('abc123');
  });
});
