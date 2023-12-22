import {
    AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../../interfaces/customer.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerValidationService } from '../../CustomerValidationService';

declare var intlTelInput: any;

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements AfterViewInit, OnDestroy, OnInit {
  customerForm: FormGroup;
  customer: Customer;
  error: string = '';
  phoneInput: any;
  mutationObserver!: MutationObserver;
  phoneNumberWithCountry!: string;
  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private customerValidationService: CustomerValidationService,
    private renderer: Renderer2
  ) {
    this.customer = data.customer;
    this.customerForm = this.customerValidationService.createForm(
      this.customer
    );
  }

  ngOnInit() {
    if (this.customer.phonenumber){
       this.phoneNumberWithCountry = this.customer.phonenumber; 
    }
    }

    ngAfterViewInit() {
        const input = document.querySelector('#phonenumber-input');
        this.phoneInput = intlTelInput(input, {
         utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
         initialCountry: 'nl',
         preferredCountries: ['nl', 'ro'],
         autoFormat: false
        });
       
        setTimeout(() => {
         const phoneNumberWithCountry = this.phoneInput.getNumber();

         const dialCode = this.phoneInput.getSelectedCountryData().dialCode;
       
         const phoneNumberWithoutCountry = phoneNumberWithCountry.replace(`+${dialCode}`, '');
       
         this.customerForm.controls['phonenumber'].setValue(phoneNumberWithoutCountry);
        }, 10); //yes technicly you should never wait x amount of seconds but this 10 miliseconds fixes all my issues will attempt a proper fix later:tm:
       
        this.applyStyles();
       }
       

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    const formattedPhoneNumber = this.customerValidationService.getFormattedPhoneNumber(this.phoneInput);
    this.customerValidationService.updateFormValue(this.customerForm, 'phonenumber', formattedPhoneNumber);
   
    if (this.customerValidationService.checkValidCustomer(this.customerForm.value)) {
      console.log(this.customerForm.value);
    } else {
      this.error = 'Invalid customer data';
    }
   }
   

  applyStyles() {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newNodes = Array.from(mutation.addedNodes);
          newNodes.forEach((node) => {
            if (this.isFlagContainer(node)) {
              this.renderer.setStyle(node, 'display', 'contents');
            }
          });
        }
      });
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  isFlagContainer(node: Node): node is HTMLElement {
    return (
      (node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).classList?.contains('iti__flag-container'))
    );
  }
}
