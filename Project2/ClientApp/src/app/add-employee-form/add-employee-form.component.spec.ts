import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeFormComponent } from './add-employee-form.component';

describe('AddEmployeeFormComponent', () => {
  let component: AddEmployeeFormComponent;
  let fixture: ComponentFixture<AddEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
