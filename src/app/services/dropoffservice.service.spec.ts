import { TestBed } from '@angular/core/testing';

import { DropoffserviceService } from './dropoffservice.service';

describe('DropoffserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropoffserviceService = TestBed.get(DropoffserviceService);
    expect(service).toBeTruthy();
  });
});
