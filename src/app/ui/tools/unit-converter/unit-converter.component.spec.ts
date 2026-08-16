import { UnitConverterComponent } from './unit-converter.component';
import { UnitConverterService } from '../../../logic/unit-converter/unit-converter.service';
import { Measure, Unit } from 'convert-units';
import { ApplicationConfig } from '../../../config/application.config';

describe('UnitConverterComponent', () => {
  let serviceSpy: jasmine.SpyObj<UnitConverterService>;
  let component: UnitConverterComponent;

  const measures: { value: Measure; label: string }[] = [{ value: 'length', label: 'Length' }];
  const lengthUnits = [
    { abbr: 'm' as Unit, measure: 'length' as Measure, system: 'metric' as const, singular: 'Meter', plural: 'Meters' },
  ];
  const conversionUnits = [
    {
      abbr: 'km' as Unit,
      measure: 'length' as Measure,
      system: 'metric' as const,
      singular: 'Kilometer',
      plural: 'Kilometers',
    },
  ];

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj<UnitConverterService>('UnitConverterService', [
      'getMeasures',
      'getMeasurePossibilities',
      'getConversionPossibilities',
      'convert',
      'convertToBest',
      'formatResult',
      'formatBestResult',
      'shouldShowBestResult',
    ]);
    serviceSpy.getMeasures.and.returnValue(measures);
    serviceSpy.getMeasurePossibilities.and.returnValue(lengthUnits);
    serviceSpy.getConversionPossibilities.and.returnValue(conversionUnits);
    serviceSpy.convert.and.returnValue(1);
    serviceSpy.convertToBest.and.returnValue({ val: 1, unit: 'km', singular: 'Kilometer', plural: 'Kilometers' });
    serviceSpy.formatResult.and.returnValue('1000 m = 1.00 km');
    serviceSpy.formatBestResult.and.returnValue('1000 m = 1 km');
    serviceSpy.shouldShowBestResult.and.returnValue(true);

    component = new UnitConverterComponent(serviceSpy);
  });

  it('should load the available measures on construction', () => {
    expect(component['measures']).toEqual(measures);
  });

  it('should load from-units and reset from/to on measure change', () => {
    component['formGroup'].setValue({ value: 5, from: 'm', to: 'km' });

    component.onMeasureChanged('length');

    expect(serviceSpy.getMeasurePossibilities).toHaveBeenCalledWith('length');
    expect(component['fromUnits']).toEqual([{ value: 'm', label: 'Meter (m)' }]);
    expect(component['formGroup'].value.from).toBeNull();
    expect(component['formGroup'].value.to).toBeNull();
  });

  describe('onFromUnitChange', () => {
    it('should load to-units when a from-unit is selected', () => {
      component.onFromUnitChange('m');

      expect(serviceSpy.getConversionPossibilities).toHaveBeenCalledWith('m');
      expect(component['toUnits']).toEqual([{ value: 'km', label: 'Kilometer (km)' }]);
    });

    it('should do nothing when the from-unit is cleared', () => {
      component.onFromUnitChange(null);

      expect(serviceSpy.getConversionPossibilities).not.toHaveBeenCalled();
    });
  });

  describe('isMeasureSelected', () => {
    it('should be false with no measure selected', () => {
      expect(component.isMeasureSelected).toBe(false);
    });

    it('should be true once a measure is selected', () => {
      component['selectedMeasure'] = 'length';
      expect(component.isMeasureSelected).toBe(true);
    });
  });

  describe('isFromUnitSelected', () => {
    it('should be false when from is null', () => {
      expect(component.isFromUnitSelected).toBe(false);
    });

    it('should be false when from is whitespace-only', () => {
      component['formGroup'].controls.from.setValue('   ' as Unit);
      expect(component.isFromUnitSelected).toBe(false);
    });

    it('should be true when from has a value', () => {
      component['formGroup'].controls.from.setValue('m');
      expect(component.isFromUnitSelected).toBe(true);
    });
  });

  it('should convert and track the best result once the form is fully valid', () => {
    component['formGroup'].setValue({ value: 1000, from: 'm', to: 'km' });

    expect(serviceSpy.convert).toHaveBeenCalledWith(1000, 'm', 'km');
    expect(serviceSpy.convertToBest).toHaveBeenCalledWith(1000, 'm');
  });

  it('should not convert while the form is incomplete', () => {
    component['formGroup'].controls.value.setValue(1000);

    expect(serviceSpy.convert).not.toHaveBeenCalled();
  });

  it('should delegate resultString/bestResultString/showBestResult to the service', () => {
    component['formGroup'].setValue({ value: 1000, from: 'm', to: 'km' });

    expect(component.resultString).toBe('1000 m = 1.00 km');
    expect(component.bestResultString).toBe('1000 m = 1 km');
    expect(component.showBestResult).toBe(true);
  });

  it('should validate the round digits via the shared util', () => {
    component['roundDigits'] = 999 as ApplicationConfig;
    component.validateRoundDigits();
    expect(component['roundDigits']).toBe(15);
  });
});
