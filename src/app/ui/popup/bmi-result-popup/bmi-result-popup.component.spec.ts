import { TestBed } from '@angular/core/testing';
import { BmiResultPopupComponent } from './bmi-result-popup.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { BmiCategory, BmiModel } from '../../../model/bmi.model';

describe('BmiResultPopupComponent', () => {
  function createWithBmi(bmi: number) {
    const data: BmiModel = {
      age: 30,
      height: 1.8,
      weight: 80,
      bmi,
      unit: 'kg/m²',
      bmiCategory: BmiCategory.NORMAL,
      healthyRange: { start: 18.5, end: 25 },
      healthyWeightRange: { start: 60, end: 81 },
      ponderalIndex: 13.7,
      ponderalUnit: 'kg/m³',
    };

    overrideAsShallow(BmiResultPopupComponent);
    TestBed.configureTestingModule({
      imports: [BmiResultPopupComponent],
      providers: [{ provide: NZ_MODAL_DATA, useValue: data }],
    });
    const fixture = TestBed.createComponent(BmiResultPopupComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should round the bmi to 2 decimal places', () => {
    const fixture = createWithBmi(24.6789);
    expect(fixture.componentInstance.bmi).toBe(24.68);
  });

  it('should not add trailing zeros for an already-rounded value', () => {
    const fixture = createWithBmi(20);
    expect(fixture.componentInstance.bmi).toBe(20);
  });
});
