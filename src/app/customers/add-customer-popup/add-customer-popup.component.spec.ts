import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCustomerPopupComponent } from './add-customer-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddCustomerPopupComponent', () => {
  let component: AddCustomerPopupComponent;
  let fixture: ComponentFixture<AddCustomerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCustomerPopupComponent],
      imports: [HttpClientModule, ReactiveFormsModule]
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
    component.newCustomer.setValue({
      name: '', //this one is empty but should not be allowed to be empty
      address: 'BavelaarStraat', //this one is not empty and isn't allowed to be either
      phonenumber: '', //this one is allowed to remain empty
      email: '', //so is this o ne
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
    component.newCustomer.setValue({
      name: 'Gordijnen man', //this one is not empty and isn't allowed to be either
      address: '', //this one is empty but should not be allowed to be empty
      phonenumber: '', //this one is allowed to remain empty
      email: '', //so is this o ne
    });

    component.submitForm();

    expect(component.popupClosed.emit).not.toHaveBeenCalled();
    expect(component.addCustomer.emit).not.toHaveBeenCalled();
    expect(component.saveCustomer).not.toHaveBeenCalled();
  })
});
