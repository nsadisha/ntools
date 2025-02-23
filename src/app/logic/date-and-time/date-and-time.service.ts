import { Injectable } from '@angular/core';
import {DateDifferenceModel} from "../../model/date-time.model";
import {DateTimeConstants} from "../../util/constants.util";

@Injectable({
  providedIn: 'root'
})
export class DateAndTimeService {

  constructor() { }

  public calculateDateDifference(fromDate: number, toDate: number): Partial<DateDifferenceModel>[] {
    const diff = toDate - fromDate;
    const diffInDays = diff / (1000 * 3600 * 24);
    const {
      YEAR_TO_DATE, MONTH_TO_DATE, WEEK_TO_DATE, DAY_TO_HOUR,
      DAY_TO_MINUTES, DAY_TO_SECONDS, DAY_TO_MILLISECONDS
    } = DateTimeConstants;

    return [
      {
        years: Math.floor(diffInDays / YEAR_TO_DATE),
        months: Math.floor((diffInDays % YEAR_TO_DATE) / MONTH_TO_DATE),
        days: Math.floor((diffInDays % YEAR_TO_DATE) % MONTH_TO_DATE)
      },
      {
        months: Math.floor(diffInDays / MONTH_TO_DATE),
        days: Math.floor(diffInDays % MONTH_TO_DATE)
      },
      {
        weeks: Math.floor(diffInDays / WEEK_TO_DATE),
        days: Math.floor(diffInDays % WEEK_TO_DATE)
      },
      { days: Math.floor(diffInDays) },
      { hours: Math.floor(diffInDays * DAY_TO_HOUR) },
      { minutes: Math.floor(diffInDays * DAY_TO_MINUTES) },
      { seconds: Math.floor(diffInDays * DAY_TO_SECONDS) },
      { milliseconds: Math.floor(diffInDays * DAY_TO_MILLISECONDS) }
    ];
  }
}
