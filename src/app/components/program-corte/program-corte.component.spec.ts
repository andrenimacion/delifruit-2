import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCorteComponent } from './program-corte.component';

describe('ProgramCorteComponent', () => {
  let component: ProgramCorteComponent;
  let fixture: ComponentFixture<ProgramCorteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramCorteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
