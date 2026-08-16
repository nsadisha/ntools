import { Constants, DateTimeConstants, Gender } from './constants.util';

describe('constants.util', () => {
  it('should define the BMI healthy range', () => {
    expect(Constants.BmiConstants.HEALTHY_RANGE_START).toBe(18.5);
    expect(Constants.BmiConstants.HEALTHY_RANGE_END).toBe(25);
  });

  it('should define Gender values', () => {
    expect(Gender.MALE).toBe('male');
    expect(Gender.FEMALE).toBe('female');
  });

  it('should define date/time conversion constants', () => {
    expect(DateTimeConstants.YEAR_TO_DATE).toBe(365);
    expect(DateTimeConstants.MONTH_TO_DATE).toBe(30);
    expect(DateTimeConstants.WEEK_TO_DATE).toBe(7);
    expect(DateTimeConstants.DAY_TO_HOUR).toBe(24);
    expect(DateTimeConstants.HOUR_TO_MINUTE).toBe(60);
    expect(DateTimeConstants.MINUTE_TO_SECOND).toBe(60);
    expect(DateTimeConstants.SECOND_TO_MILLISECOND).toBe(1000);
    expect(DateTimeConstants.DAY_TO_MINUTES).toBe(1440);
    expect(DateTimeConstants.DAY_TO_SECONDS).toBe(86400);
    expect(DateTimeConstants.DAY_TO_MILLISECONDS).toBe(86400000);
  });
});
