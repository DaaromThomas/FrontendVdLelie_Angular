import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddCustomerPopupComponent } from './add-customer-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgControl, NgModel } from '@angular/forms';
import { CustomerValidationService } from '../CustomerValidationService';

describe('AddCustomerPopupComponent', () => {
  let component: AddCustomerPopupComponent;
  let fixture: ComponentFixture<AddCustomerPopupComponent>;
  let mockRenderer: jasmine.SpyObj<Renderer2>;
  let mockMutationObserver: jasmine.SpyObj<MutationObserver>;

  beforeEach(
    waitForAsync(() => {
      mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
      mockMutationObserver = jasmine.createSpyObj('MutationObserver', ['observe']);

      TestBed.configureTestingModule({
        declarations: [AddCustomerPopupComponent],
        imports: [HttpClientModule, ReactiveFormsModule, MatFormFieldModule, FormsModule],
        providers: [
          { provide: Renderer2, useValue: mockRenderer },
          { provide: MutationObserver, useValue: mockMutationObserver },
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: CustomerValidationService, useValue: new CustomerValidationService() },
          { provide: FormBuilder, useValue: new FormBuilder() },
          { provide: NgControl, useValue: { control: {} } },
          { provide: NgModel, useValue: { control: {}, reset: () => {} } },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AddCustomerPopupComponent);
          component = fixture.componentInstance;
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit when submitForm is called with empty name', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component, 'saveCustomer');

    component.newCustomerForm.setValue({
      name: '',
      address: 'BavelaarStraat',
      phonenumber: '',
      email: 'test@test.com',
    });

    component.submitForm();

    expect(component.popupClosed.emit).not.toHaveBeenCalled();
    expect(component.saveCustomer).not.toHaveBeenCalled();
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
