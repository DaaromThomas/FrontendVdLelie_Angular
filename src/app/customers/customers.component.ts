import { Component, ViewChild } from '@angular/core';
import { Customer } from '../interfaces/customer.interface';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  nameFilter!: string;
  addressFilter!: string;
  phoneFilter!: string;
  emailFilter!: string;
  packageFilter!: string;

  subscription: any;
  customerList: Customer[] = [];
  filteredCustomerList!: MatTableDataSource<Customer>;
  displayAddCustomer: boolean = false;
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
    this.filteredCustomerList = new MatTableDataSource();
    this.dataStorageService.getCustomers();
    this.populateCustomerData();
  }

  populateCustomerData(): void {
    this.subscription = this.dataStorageService.customerList$.subscribe(
      async (customerData) => {
        this.customerList = (customerData);
        this.filteredCustomerList.data = customerData.slice().reverse();     
        this.filteredCustomerList.data = await this.appendNullObjects(this.filteredCustomerList.data); 
        this.filteredCustomerList.paginator = this.paginator;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addCustomer() {
    this.dialog.open(AddCustomerPopupComponent)
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

  applyFilters() {
    let filteredCustomerList = this.customerList.slice().reverse();

    if (this.nameFilter || this.addressFilter || this.phoneFilter || this.emailFilter || this.packageFilter) {
      filteredCustomerList = filteredCustomerList.filter(customer => {
        if (customer === null) {
          return false;
        }

        const nameMatches = !this.nameFilter || customer.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        const addressMatches = !this.addressFilter || customer.address.toLowerCase().includes(this.addressFilter.toLowerCase());
        const phoneMatches = !this.phoneFilter || customer.phonenumber?.toLowerCase().includes(this.phoneFilter.toLowerCase());
        const emailMatches = !this.emailFilter || customer.email.toLowerCase().includes(this.emailFilter.toLowerCase());
        const packageMatches = !this.packageFilter || customer.preferredPackaging?.name.toLowerCase().includes(this.packageFilter.toLowerCase());

        return nameMatches && addressMatches && phoneMatches && emailMatches && packageMatches
      });
    }

    filteredCustomerList = this.appendNullObjects(filteredCustomerList);
    this.filteredCustomerList.data = filteredCustomerList;
  }

  appendNullObjects(filteredCustomerList: Customer[]): Customer[] {
    while (filteredCustomerList.length % this.customersPerPage !== 0) {
      const emptyItem = Object.create(null);
      filteredCustomerList.push(emptyItem);
    }  
    return filteredCustomerList
  }
}
