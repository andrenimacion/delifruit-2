import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingBudgetComponent } from './packing-budget.component';

describe('PackingBudgetComponent', () => {
  let component: PackingBudgetComponent;
  let fixture: ComponentFixture<PackingBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
