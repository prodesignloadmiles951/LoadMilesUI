import { TestBed } from '@angular/core/testing';

import { PickupserviceService } from './pickupservice.service';

describe('PickupserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickupserviceService = TestBed.get(PickupserviceService);
    expect(service).toBeTruthy();
  });
});
