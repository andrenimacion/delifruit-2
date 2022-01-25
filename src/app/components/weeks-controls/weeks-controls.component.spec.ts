import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksControlsComponent } from './weeks-controls.component';

describe('WeeksControlsComponent', () => {
  let component: WeeksControlsComponent;
  let fixture: ComponentFixture<WeeksControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeksControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeksControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
