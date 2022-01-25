import { TestBed } from '@angular/core/testing';

import { BoxConveyorService } from './box-conveyor.service';

describe('BoxConveyorService', () => {
  let service: BoxConveyorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxConveyorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
