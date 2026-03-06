import { TestBed } from '@angular/core/testing';

import { HealthAndFitnessService } from './health-and-fitness.service';

describe('HealthAndFitnessService', () => {
  let service: HealthAndFitnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthAndFitnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
