import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';
import { Customer } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-add-customer-popup',
  templateUrl: './add-customer-popup.component.html',
  styleUrl: './add-customer-popup.component.css',
})
export class AddCustomerPopupComponent {
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

  constructor(private storageService: DataStorageService) {}

  ngOnInit() {
    this.storageService.getCustomers();
    this.storageService.customerList$.subscribe((customerData) => {
      this.customerList = customerData;
    })
  }

  submitForm(): void {
    let customer: Customer = this.newCustomer.value;
    customer.number = this.customerList.length + 1;
    console.log(customer)
  

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

  discardForm(): void {
    this.popupClosed.emit(true);
  }

  checkValidCustomer(customer: Customer): boolean {
    console.log(customer);

    if (!customer.name) {
      this.error = 'name is undefined';
      return false;
    }
    if (!customer.address) {
      this.error = 'address is undefined'
      return false;
    }

    return true;
  }

  saveCustomer(customer: Customer) {
    this.storageService
      .storeCustomer(customer)
      .subscribe(() => this.storageService.getCustomers());
    this.storageService.getCustomers();
  }
}
