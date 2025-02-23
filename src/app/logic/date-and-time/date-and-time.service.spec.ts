import { TestBed } from '@angular/core/testing';

import { DateAndTimeService } from './date-and-time.service';

describe('DateAndTimeService', () => {
  let service: DateAndTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateAndTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
