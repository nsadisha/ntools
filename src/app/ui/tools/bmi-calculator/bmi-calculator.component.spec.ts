import { BmiCalculatorComponent } from './bmi-calculator.component';
import { HealthAndFitnessService } from '../../../logic/health-and-fitness/health-and-fitness.service';
import { PopupService } from '../../../service/popup/popup.service';
import { BmiResultPopupComponent } from '../../popup/bmi-result-popup/bmi-result-popup.component';
import { Gender } from '../../../util/constants.util';
import { BmiModel } from '../../../model/bmi.model';

describe('BmiCalculatorComponent', () => {
  let healthAndFitnessServiceSpy: jasmine.SpyObj<HealthAndFitnessService>;
  let popupServiceSpy: jasmine.SpyObj<PopupService>;
  let component: BmiCalculatorComponent;

  const bmiModel = { bmi: 20 } as BmiModel;

  beforeEach(() => {
    healthAndFitnessServiceSpy = jasmine.createSpyObj<HealthAndFitnessService>('HealthAndFitnessService', [
      'calculateBMI',
    ]);
    healthAndFitnessServiceSpy.calculateBMI.and.returnValue(bmiModel);
    popupServiceSpy = jasmine.createSpyObj<PopupService>('PopupService', ['createComponentModal']);

    component = new BmiCalculatorComponent(healthAndFitnessServiceSpy, popupServiceSpy);
  });

  it('should list all genders with capitalized labels', () => {
    expect(component.getGenders()).toEqual([
      { label: 'Male', value: Gender.MALE },
      { label: 'Female', value: Gender.FEMALE },
    ]);
  });

  it('should mark invalid fields dirty and not calculate when the form is invalid', () => {
    component['formGroup'].controls.age.setValue(null);

    component.calculateBMI();

    expect(healthAndFitnessServiceSpy.calculateBMI).not.toHaveBeenCalled();
    expect(component['formGroup'].controls.age.dirty).toBe(true);
  });

  it('should convert height to meters and open the result popup', () => {
    component['formGroup'].setValue({ age: 30, gender: Gender.MALE, height: 180, weight: 80 });

    component.calculateBMI();

    expect(healthAndFitnessServiceSpy.calculateBMI).toHaveBeenCalledWith(30, 1.8, 80);
    expect(popupServiceSpy.createComponentModal).toHaveBeenCalledWith({
      nzTitle: 'BMI Result',
      nzContent: BmiResultPopupComponent,
      nzData: bmiModel,
    });
  });

  it('should default age/height/weight to 1 when their (disabled) controls hold no value', () => {
    // A disabled control is excluded from the group's own validity/value
    // aggregation, so the form can be "valid" while these three fall back
    // to their `|| 1` defaults — otherwise unreachable, since every
    // enabled path is guarded by min-value validators.
    component['formGroup'].controls.age.disable();
    component['formGroup'].controls.age.setValue(null);
    component['formGroup'].controls.height.disable();
    component['formGroup'].controls.height.setValue(null);
    component['formGroup'].controls.weight.disable();
    component['formGroup'].controls.weight.setValue(null);

    component.calculateBMI();

    expect(healthAndFitnessServiceSpy.calculateBMI).toHaveBeenCalledWith(1, 0.01, 1);
  });
});
