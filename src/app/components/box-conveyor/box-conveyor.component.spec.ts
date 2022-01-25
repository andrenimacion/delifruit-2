import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxConveyorComponent } from './box-conveyor.component';

describe('BoxConveyorComponent', () => {
  let component: BoxConveyorComponent;
  let fixture: ComponentFixture<BoxConveyorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxConveyorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxConveyorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
