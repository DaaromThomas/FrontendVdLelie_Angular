import { Component } from '@angular/core';
import { Customer } from '../interfaces/customer.interface';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  subscription: any;
  customerList: Customer[] = [];
  displayAddCustomer: boolean = false;
  applyBlur: boolean = false;
  tableWrapperClass: string = 'table-wrapper';

  constructor(
    private dataStorageService: DataStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataStorageService.getCustomers();
    this.populateCustomerData();
  }

  populateCustomerData(): void {
    this.subscription = this.dataStorageService.customerList$.subscribe(
      (customerData) => {
        this.customerList = customerData;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayAddCustomerPopup() {
    this.displayAddCustomer = true;
    this.applyBlur = true;
  }

  onAddCustomerPopupClosed(isClosed: boolean) {
    this.displayAddCustomer = !isClosed;
    this.applyBlur = !isClosed;
  }

  trackByFn(index: number, customer: Customer) {
    return customer.id; // unique id corresponding to the customer
  }

  editCustomer(customer: Customer) {
    this.dialog.open(EditCustomerComponent, {
      data: {
        customer: customer,
      },
    });
  }

  deleteCustomer(customer: Customer) {
    this.dialog.open(DeleteCustomerComponent, {
      data: {
        customer: customer,
      },
    });
  }
}
