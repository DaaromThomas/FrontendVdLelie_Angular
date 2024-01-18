import { Component, ViewChild } from '@angular/core';
import { Customer } from '../interfaces/customer.interface';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  subscription: any;
  customerList!: MatTableDataSource<Customer>;
  displayAddCustomer: boolean = false;
  applyBlur: boolean = false;
  tableWrapperClass: string = 'table-wrapper';
  selectedCustomerId : string = "";
  displayedColumns: string[] = ['name', 'address', 'phoneNumber', 'e-mail', 'preferredPackaging', "customerOptions"];
  customersPerPage: number = 15;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



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
        this.customerList = new MatTableDataSource(customerData);
        while (this.customerList.data.length % this.customersPerPage !== 0) {
          const emptyItem = Object.create(null);
          emptyItem.ignoreSorting = true;
          this.customerList.data.push(emptyItem);
        }        
        this.customerList.paginator = this.paginator;
        this.customerList.sort = this.sort;
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
      autoFocus: false
    });
  }
}
