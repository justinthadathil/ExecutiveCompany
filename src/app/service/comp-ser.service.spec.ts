import { TestBed } from '@angular/core/testing';

import { CompSerService } from './comp-ser.service';

describe('CompSerService', () => {
  let service: CompSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
