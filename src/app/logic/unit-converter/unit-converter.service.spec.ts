import { TestBed } from '@angular/core/testing';

import { UnitConverterService } from './unit-converter.service';

describe('UnitConverterService', () => {
  let service: UnitConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
