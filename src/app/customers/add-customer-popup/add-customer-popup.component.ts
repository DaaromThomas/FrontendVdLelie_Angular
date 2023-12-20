import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';
import { Customer } from '../../interfaces/customer.interface';

declare var intlTelInput: any;

@Component({
  selector: 'app-add-customer-popup',
  templateUrl: './add-customer-popup.component.html',
  styleUrls: ['./add-customer-popup.component.css'],
})
export class AddCustomerPopupComponent implements AfterViewInit {
  customerList: Customer[] = [];

  newCustomer: FormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
  });

  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addCustomer: EventEmitter<any> = new EventEmitter<any>();

  error: string = '';

  phoneInput: any;

  constructor(private storageService: DataStorageService) {}

  ngOnInit() {
    this.storageService.getCustomers();
    this.storageService.customerList$.subscribe((customerData) => {
      this.customerList = customerData;
    });
  }

  ngAfterViewInit() {
    const input = document.querySelector('#phonenumber-input');
    this.phoneInput = intlTelInput(input, {
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
        initialCountry: 'nl',
        preferredCountries: ['nl', 'ro']
    });
    this.applyStyles();
  }

  submitForm(): void {
    if (this.phoneInput) {
      const fullNumber = this.phoneInput.getNumber();
      console.log(fullNumber);
      const fullNumberString = fullNumber.toString();
      const countryData = this.phoneInput.getSelectedCountryData();
      const countryCode = countryData.dialCode;

      const formattedNumber =
        '+' +
        countryCode +
        ' ' +
        fullNumberString.replace('+' + countryCode, '');
      let customer: Customer = {
        ...this.newCustomer.value,
        phonenumber: formattedNumber,
      };
      customer.number = this.getRandomInt(100000);
      console.log(customer);

      if (customer === undefined) {
        return;
      }
      if (customer.phonenumber === '') {
        customer.phonenumber = null;
      }
      if (customer.email === '') {
        customer.email = null;
      }
      if (this.checkValidCustomer(customer)) {
        this.popupClosed.emit(true);
        this.addCustomer.emit(customer);
        this.saveCustomer(customer);
        return;
      }
    }
  }

  discardForm(): void {
    this.popupClosed.emit(true);
  }

  checkValidCustomer(customer: Customer): boolean {
    if (!customer.name) {
      this.error = 'name is undefined';
      return false;
    }
    if (!customer.address) {
      this.error = 'address is undefined';
      return false;
    }

    return true;
  }

  saveCustomer(customer: Customer) {
    console.log(customer);
    this.storageService
      .storeCustomer(customer)
      .subscribe(() => this.storageService.getCustomers());
    this.storageService.getCustomers();
  }

  applyStyles() {
    let observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
       if (mutation.addedNodes.length) {
         var newNodes = Array.from(mutation.addedNodes);
         newNodes.forEach(function(node) {
           if ((node as HTMLElement).classList && (node as HTMLElement).classList.contains('iti__flag-container')) {
             (node as HTMLElement).style.display = 'contents';
           }
         });
       }
      });
     });
     
     observer.observe(document.body, { childList: true, subtree: true }); 
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
