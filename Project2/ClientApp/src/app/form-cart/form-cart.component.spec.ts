import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCartComponent } from './form-cart.component';

describe('FormCartComponent', () => {
  let component: FormCartComponent;
  let fixture: ComponentFixture<FormCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
