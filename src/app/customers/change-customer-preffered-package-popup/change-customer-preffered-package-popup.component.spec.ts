import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCustomerPrefferedPackagePopupComponent } from './change-customer-preffered-package-popup.component';

describe('ChangeCustomerPrefferedPackagePopupComponent', () => {
  let component: ChangeCustomerPrefferedPackagePopupComponent;
  let fixture: ComponentFixture<ChangeCustomerPrefferedPackagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeCustomerPrefferedPackagePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeCustomerPrefferedPackagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
