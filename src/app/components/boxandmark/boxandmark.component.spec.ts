import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxandmarkComponent } from './boxandmark.component';

describe('BoxandmarkComponent', () => {
  let component: BoxandmarkComponent;
  let fixture: ComponentFixture<BoxandmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxandmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxandmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
