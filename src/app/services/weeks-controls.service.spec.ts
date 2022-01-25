import { TestBed } from '@angular/core/testing';

import { WeeksControlsService } from './weeks-controls.service';

describe('WeeksControlsService', () => {
  let service: WeeksControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeksControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
