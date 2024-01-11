import { EditCustomerComponent } from './edit-customer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerValidationService } from '../../CustomerValidationService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;
  let fixture: ComponentFixture<EditCustomerComponent>;
  let customerValidationService: CustomerValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCustomerComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        {
          provide: CustomerValidationService,
          useValue: jasmine.createSpyObj('CustomerValidationService', [
            'validate',
            'createForm',
          ]),
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCustomerComponent);
    component = fixture.componentInstance;
    customerValidationService = TestBed.inject(CustomerValidationService);

    component.customerForm = new FormGroup({
      name: new FormControl('John Doe'),
      address: new FormControl('123 Main St'),
      phonenumber: new FormControl('1234567890'),
      email: new FormControl('john.doe@example.com')
    })

    component.phoneInput = {
      getNumber: () => '+31168587823',
      getSelectedCountryData: () => ({ dialCode: '31' }),
    };
  });

  describe('processPhoneNumber', () => {
    it('should process the phone number correctly', () => {
      spyOn(component.phoneInput, 'getNumber').and.returnValue('+31168587823');
      spyOn(component.phoneInput, 'getSelectedCountryData').and.returnValue({
        dialCode: '31',
      });

      component.processPhoneNumber();

      expect(component.customerForm.controls['phonenumber'].value).toBe(
        '168587823'
      );
    });
  });
});
