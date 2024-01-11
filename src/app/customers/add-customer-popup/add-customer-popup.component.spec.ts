import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCustomerPopupComponent } from './add-customer-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Renderer2 } from '@angular/core';

describe('AddCustomerPopupComponent', () => {
 let component: AddCustomerPopupComponent;
 let fixture: ComponentFixture<AddCustomerPopupComponent>;
 let mockRenderer: jasmine.SpyObj<Renderer2>;
 let mockMutationObserver: jasmine.SpyObj<MutationObserver>;

 beforeEach(async () => {
   (window as any).intlTelInput = function() {
     return {
       destroy: () => {},
       getNumber: () => '+1234567890',
       getNumberType: () => {},
       getSelectedCountryData: () => ({ dialCode: '1', iso2: 'us' }),
     };
   };

   mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
   mockMutationObserver = jasmine.createSpyObj('MutationObserver', ['observe']);

   await TestBed.configureTestingModule({
     declarations: [AddCustomerPopupComponent],
     imports: [HttpClientModule, ReactiveFormsModule,],
     providers: [
       { provide: Renderer2, useValue: mockRenderer },
       { provide: MutationObserver, useValue: mockMutationObserver },
     ],
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

    component.newCustomerForm.setValue({
      name: '',
      address: 'BavelaarStraat',
      phonenumber: '',
      email: 'test@test.com',
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

    component.newCustomerForm.setValue({
      name: 'Gordijnen man',
      address: '',
      phonenumber: '',
      email: 'test@test.com',
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

    component.newCustomerForm.setValue({
      name: 'Gordijnen man',
      address: 'BavelaarStraat',
      phonenumber: '',
      email: '',
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

    component.newCustomerForm.setValue({
      name: 'Gordijnen man',
      address: 'BavelaarStraat',
      phonenumber: '',
      email: 'hello@iamnotvalid',
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

    component.newCustomerForm.setValue({
      name: 'Gordijnen man',
      address: 'BavelaarStraat',
      phonenumber: '',
      email: 'test@test.com',
    });

    component.submitForm();

    expect(component.popupClosed.emit).toHaveBeenCalled();
    expect(component.addCustomer.emit).toHaveBeenCalled();
    expect(component.saveCustomer).toHaveBeenCalled();
  })

  it('should call observe method of MutationObserver', () => {
    const observeSpy = spyOn(MutationObserver.prototype, 'observe');
   
    component.applyStyles();
   
    expect(observeSpy).toHaveBeenCalledWith(document.body, { childList: true, subtree: true });
   });
   
 
  it('should identify flag container nodes', () => {
    const dummyElement = document.createElement('div');
    dummyElement.classList.add('iti__flag-container');
 
    const result = component.isFlagContainer(dummyElement);
 
    expect(result).toBeTrue();
  });

  it('should not identify non-flag container nodes', () => {
    const dummyTextNode = document.createTextNode('This is a text node');
    const dummyElement = document.createElement('div');
   
    const resultTextNode = component.isFlagContainer(dummyTextNode);
    const resultElement = component.isFlagContainer(dummyElement);
   
    expect(resultTextNode).toBeFalse();
    expect(resultElement).toBeFalse();
   });
   

});
