import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTableBootstrapComponent } from './grid-table-bootstrap.component';

describe('GridTableBootstrapComponent', () => {
  let component: GridTableBootstrapComponent;
  let fixture: ComponentFixture<GridTableBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridTableBootstrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridTableBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
