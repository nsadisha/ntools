import { TestBed } from '@angular/core/testing';

import { ContactUsApiService } from './contact-us-api.service';

describe('ContactUsApiService', () => {
  let service: ContactUsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactUsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
