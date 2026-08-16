import { AgeCalculatorComponent } from './age-calculator.component';
import { DateAndTimeService } from '../../../logic/date-and-time/date-and-time.service';
import { NzMessageService } from 'ng-zorro-antd/message';

describe('AgeCalculatorComponent', () => {
  let messageServiceSpy: jasmine.SpyObj<NzMessageService>;
  let dateAndTimeServiceSpy: jasmine.SpyObj<DateAndTimeService>;
  let component: AgeCalculatorComponent;

  beforeEach(() => {
    messageServiceSpy = jasmine.createSpyObj<NzMessageService>('NzMessageService', ['error']);
    dateAndTimeServiceSpy = jasmine.createSpyObj<DateAndTimeService>('DateAndTimeService', [
      'calculateDateDifference',
      'formatDateDifference',
    ]);
    component = new AgeCalculatorComponent(messageServiceSpy, dateAndTimeServiceSpy);
  });

  it('should mark invalid fields dirty and not calculate when the form is invalid', () => {
    component['calculate']();

    expect(dateAndTimeServiceSpy.calculateDateDifference).not.toHaveBeenCalled();
    expect(component['formGroup'].controls.birthday.dirty).toBe(true);
  });

  it('should show an error when the to-date is before the birthday', () => {
    component['formGroup'].setValue({ birthday: new Date(2020, 0, 2), toDate: new Date(2020, 0, 1) });

    component['calculate']();

    expect(messageServiceSpy.error).toHaveBeenCalledWith("The 'To Date' must be greater than the 'Birthday'.");
    expect(dateAndTimeServiceSpy.calculateDateDifference).not.toHaveBeenCalled();
  });

  it('should filter all-zero results and format the remaining ones', () => {
    const birthday = new Date(2000, 0, 1);
    const toDate = new Date(2020, 0, 1);
    component['formGroup'].setValue({ birthday, toDate });

    dateAndTimeServiceSpy.calculateDateDifference.and.returnValue([
      { years: 20, months: 0, days: 0 },
      { years: 0, months: 0, days: 0 },
    ]);
    dateAndTimeServiceSpy.formatDateDifference.and.returnValue('20 Years');

    component['calculate']();

    expect(component['results']).toEqual([{ years: 20, months: 0, days: 0 }]);
    expect(dateAndTimeServiceSpy.formatDateDifference).toHaveBeenCalledTimes(1);
    expect(component['stringResults']).toEqual(['20 Years']);
  });
});
