import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCustomerPopupComponent } from './add-customer-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddCustomerPopupComponent', () => {
  let component: AddCustomerPopupComponent;
  let fixture: ComponentFixture<AddCustomerPopupComponent>;

  beforeEach(async () => {
    (window as any).intlTelInput = function() {
      return {
        destroy: () => {},
        getNumber: () => '+1234567890',
        getNumberType: () => {},
        getSelectedCountryData: () => ({ dialCode: '1', iso2: 'us' }),
      };
    };

    await TestBed.configureTestingModule({
      declarations: [AddCustomerPopupComponent],
      imports: [HttpClientModule, ReactiveFormsModule,],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCustomerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit when submitForm is called with empty name', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addCustomer, 'emit');
    spyOn(component, 'saveCustomer');

    //set form values with invalid required data
    component.newCustomerForm.setValue({
      name: '', //this one is empty but should not be allowed to be empty
      address: 'BavelaarStraat', //this one is not empty and isn't allowed to be either
      phonenumber: '', //this one is allowed to remain empty
      email: 'test@test.com', //this one should not be allowed to be empty
    });

    component.submitForm();

    expect(component.popupClosed.emit).not.toHaveBeenCalled();
    expect(component.addCustomer.emit).not.toHaveBeenCalled();
    expect(component.saveCustomer).not.toHaveBeenCalled();
  })

  it('should not emit when submitForm is called with empty address', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addCustomer, 'emit');
    spyOn(component, 'saveCustomer');

    //set form values with invalid required data
    component.newCustomerForm.setValue({
      name: 'Gordijnen man', //this one is not empty and isn't allowed to be either
      address: '', //this one is empty but should not be allowed to be empty
      phonenumber: '', //this one is allowed to remain empty
      email: 'test@test.com', //this one should not be allowed to be empty
    });

    component.submitForm();

    expect(component.popupClosed.emit).not.toHaveBeenCalled();
    expect(component.addCustomer.emit).not.toHaveBeenCalled();
    expect(component.saveCustomer).not.toHaveBeenCalled();
  })

  it('should not emit when submitForm is called with empty e-mail', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addCustomer, 'emit');
    spyOn(component, 'saveCustomer');

    //set form values with invalid required data
    component.newCustomerForm.setValue({
      name: 'Gordijnen man', //this one is not empty and isn't allowed to be either
      address: 'BavelaarStraat', //this one is empty but should not be allowed to be empty
      phonenumber: '', //this one is allowed to remain empty
      email: '', //this one should not be allowed to be empty
    });

    component.submitForm();

    expect(component.popupClosed.emit).not.toHaveBeenCalled();
    expect(component.addCustomer.emit).not.toHaveBeenCalled();
    expect(component.saveCustomer).not.toHaveBeenCalled();
  })

  it('should not emit when submitForm is called with an invalid e-mail', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addCustomer, 'emit');
    spyOn(component, 'saveCustomer');

    //set form values with invalid required data
    component.newCustomerForm.setValue({
      name: 'Gordijnen man', //this one is not empty and isn't allowed to be either
      address: 'BavelaarStraat', //this one is empty but should not be allowed to be empty
      phonenumber: '', //this one is allowed to remain empty
      email: 'hello@iamnotvalid', //this one should not be allowed to be empty
    });

    component.submitForm();

    expect(component.popupClosed.emit).not.toHaveBeenCalled();
    expect(component.addCustomer.emit).not.toHaveBeenCalled();
    expect(component.saveCustomer).not.toHaveBeenCalled();
  })

  it('should emit when submitForm is called with empty phonenumber', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addCustomer, 'emit');
    spyOn(component, 'saveCustomer');

    //set form values with invalid required data
    component.newCustomerForm.setValue({
      name: 'Gordijnen man', //this one is not empty and isn't allowed to be either
      address: 'BavelaarStraat', //this one is empty but should not be allowed to be empty
      phonenumber: '', //this one is allowed to remain empty
      email: 'test@test.com', //this one should not be allowed to be empty
    });

    component.submitForm();

    expect(component.popupClosed.emit).toHaveBeenCalled();
    expect(component.addCustomer.emit).toHaveBeenCalled();
    expect(component.saveCustomer).toHaveBeenCalled();
  })
});
