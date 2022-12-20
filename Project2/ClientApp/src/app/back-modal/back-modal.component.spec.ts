import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackModalComponent } from './back-modal.component';

describe('BackModalComponent', () => {
  let component: BackModalComponent;
  let fixture: ComponentFixture<BackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
