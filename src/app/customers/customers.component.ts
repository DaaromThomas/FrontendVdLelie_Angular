import { Component } from '@angular/core';
import { Customer } from '../interfaces/customer.interface';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  subscription: any;
  customerList: Customer[] = [];
  displayAddCustomer: boolean = false;
  displayChangePrefferedPackage: boolean = false;
  applyBlur: boolean = false;
  tableWrapperClass: string = 'table-wrapper';
  selectedCustomerId : string = "";


  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(){
    this.dataStorageService.getCustomers();
    this.populateCustomerData();
  }

  populateCustomerData(): void {
    this.subscription = this.dataStorageService.customerList$.subscribe((customerData) => {
      console.log(customerData);
      this.customerList = customerData;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayAddCustomerPopup() {
    this.displayAddCustomer = true;
    this.applyBlur = true;
  }
  displayChangePrefferedPackagePopup(customerId: any) {
    this.selectedCustomerId = customerId;
    this.displayChangePrefferedPackage = true;
    this.applyBlur = true;
  }

  onAddCustomerPopupClosed(isClosed: boolean) {
    this.displayAddCustomer = !isClosed;
    this.applyBlur = !isClosed;
  }

  onChangePrefferedPackagePopupClosed(isClosed: boolean) {
    this.displayChangePrefferedPackage = !isClosed;
    this.applyBlur = !isClosed;
  }

}
