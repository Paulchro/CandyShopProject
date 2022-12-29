import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllproductsComponent } from './admin-allproducts.component';

describe('AdminAllproductsComponent', () => {
  let component: AdminAllproductsComponent;
  let fixture: ComponentFixture<AdminAllproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
