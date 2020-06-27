import { TestBed } from '@angular/core/testing';

import { CreateloadService } from './createload.service';

describe('CreateloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateloadService = TestBed.get(CreateloadService);
    expect(service).toBeTruthy();
  });
});
