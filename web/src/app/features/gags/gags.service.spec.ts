import { TestBed } from '@angular/core/testing';

import { GagsService } from './gags.service';

describe('GagsService', () => {
  let service: GagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
