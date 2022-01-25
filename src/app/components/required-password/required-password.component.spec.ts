import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredPasswordComponent } from './required-password.component';

describe('RequiredPasswordComponent', () => {
  let component: RequiredPasswordComponent;
  let fixture: ComponentFixture<RequiredPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
