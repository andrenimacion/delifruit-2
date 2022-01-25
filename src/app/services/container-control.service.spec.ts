import { TestBed } from '@angular/core/testing';

import { ContainerControlService } from './container-control.service';

describe('ContainerControlService', () => {
  let service: ContainerControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
