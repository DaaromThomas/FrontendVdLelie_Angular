import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ChangeCustomerPrefferedPackagePopupComponent } from './change-customer-preffered-package-popup.component';
import {EditCustomerComponent} from "../edit-customer/edit-customer/edit-customer.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('ChangeCustomerPrefferedPackagePopupComponent', () => {
  let component: ChangeCustomerPrefferedPackagePopupComponent;
  let fixture: ComponentFixture<ChangeCustomerPrefferedPackagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeCustomerPrefferedPackagePopupComponent],
      imports: [HttpClientTestingModule, MatFormFieldModule, MatOptionModule, MatSelectModule, FormsModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCustomerPrefferedPackagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not close popup when when no package is selected', () =>{
      spyOn(component.popupClosed, 'emit');

      component.setPrefferedPackage();

      expect(component.popupClosed.emit).not.toHaveBeenCalled();
  })

});
