import { TestBed } from '@angular/core/testing';

import { Prcor01Service } from './prcor01.service';

describe('Prcor01Service', () => {
  let service: Prcor01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prcor01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
