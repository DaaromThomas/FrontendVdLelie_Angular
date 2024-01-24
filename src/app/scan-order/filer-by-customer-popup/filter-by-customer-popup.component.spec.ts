import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByCustomerPopupComponent } from './filter-by-customer-popup.component';

describe('FilerByCustomerPopupComponent', () => {
  let component: FilterByCustomerPopupComponent;
  let fixture: ComponentFixture<FilterByCustomerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByCustomerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByCustomerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
