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
  tableWrapperClass: string = 'table-wrapper';

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

}
