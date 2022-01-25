import { TestBed } from '@angular/core/testing';

import { PackingBudgetService } from './packing-budget.service';

describe('PackingBudgetService', () => {
  let service: PackingBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackingBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
