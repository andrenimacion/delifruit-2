import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chartline2Component } from './chartline2.component';

describe('Chartline2Component', () => {
  let component: Chartline2Component;
  let fixture: ComponentFixture<Chartline2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chartline2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chartline2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
