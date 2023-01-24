import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductFormComponent } from './edit-product-form.component';

describe('EditProductFormComponent', () => {
  let component: EditProductFormComponent;
  let fixture: ComponentFixture<EditProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
