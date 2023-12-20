import { Component, EventEmitter, Output, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';
import { Customer } from '../../interfaces/customer.interface';

declare var intlTelInput: any;

@Component({
  selector: 'app-add-customer-popup',
  templateUrl: './add-customer-popup.component.html',
  styleUrls: ['./add-customer-popup.component.css'],
})
export class AddCustomerPopupComponent implements AfterViewInit, OnDestroy {
  customerList: Customer[] = [];
  newCustomerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
  });

  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addCustomer: EventEmitter<any> = new EventEmitter<any>();

  error: string = '';
  phoneInput: any;
  mutationObserver!: MutationObserver;

  constructor(private storageService: DataStorageService, private renderer: Renderer2) {}

  ngOnInit() {
    this.storageService.getCustomers();
    this.storageService.customerList$.subscribe((customerData) => {
      this.customerList = customerData;
    });
  }

  ngAfterViewInit() {
    const input = document.querySelector('#phonenumber-input');
    this.phoneInput = intlTelInput(input, {
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      initialCountry: 'nl',
      preferredCountries: ['nl', 'ro'],
    });
    this.applyStyles();
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  submitForm(): void {
    let newCustomer: Customer = {
      ...this.newCustomerForm.value,
      phonenumber: this.getFormattedPhoneNumber()
    }

    newCustomer.number = this.customerList.length + 1;

      if (newCustomer === undefined) {
        return;
      }
      if (this.checkValidCustomer(newCustomer)) {
        this.popupClosed.emit(true);
        this.addCustomer.emit(newCustomer);
        this.saveCustomer(newCustomer);
        return;
      }
  }

  discardForm(): void {
    this.popupClosed.emit(true);
  }

  checkValidCustomer(customer: Customer): boolean {
    if (!customer.name) {
      this.error = 'name is empty';
      return false;
    }
    if (!customer.address) {
      this.error = 'address is empty';
      return false;
    }
    if (!customer.email) {
      this.error = 'email is empty'
      return false;
    }

    return true;
  }

  getFormattedPhoneNumber(): string | null {
    if (this.phoneInput) {
      const fullNumber = this.phoneInput.getNumber();
      if (fullNumber === '') {
        return null;
      }
      const fullNumberString = fullNumber.toString();
      const countryData = this.phoneInput.getSelectedCountryData();
      const countryCode = countryData.dialCode;

      const formattedNumber =
        '+' + countryCode + ' ' + fullNumberString.replace('+' + countryCode, '');
        return formattedNumber;
    }
    return null;
  }

  saveCustomer(customer: Customer) {
    this.storageService
      .storeCustomer(customer)
      .subscribe(() => this.storageService.getCustomers());
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

    this.mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  isFlagContainer(node: Node): node is HTMLElement {
    return (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as HTMLElement).classList?.contains('iti__flag-container')
    );
  }
}
