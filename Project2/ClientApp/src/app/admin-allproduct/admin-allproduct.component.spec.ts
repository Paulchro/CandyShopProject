import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllproductComponent } from './admin-allproduct.component';

describe('AdminAllproductComponent', () => {
  let component: AdminAllproductComponent;
  let fixture: ComponentFixture<AdminAllproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
