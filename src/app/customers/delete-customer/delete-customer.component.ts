import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../interfaces/customer.interface';
import { DataStorageService } from '../../services/data-storage.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css'],
})
export class DeleteCustomerComponent implements OnInit {
  customer: Customer;
  customerForm!: FormGroup;
  error: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataStorageService: DataStorageService
  ) {
    this.customer = data.customer;
  }

  ngOnInit(): void {
    this.customerForm = this.createForm(this.customer);
  }

  createForm(customer: any): FormGroup {
    return new FormGroup({
      name: new FormControl({ value: customer.name, disabled: true }),
      address: new FormControl({ value: customer.address, disabled: true }),
      phonenumber: new FormControl({
        value: customer.phonenumber,
        disabled: true,
      }),
      email: new FormControl({ value: customer.email, disabled: true }),
    });
  }

  async onDelete(): Promise<void> {
    const isSafeToDelete = await this.safeToDelete();
    if (this.customer.id && isSafeToDelete) {
      this.dataStorageService
        .deleteCustomer(this.customer.id)
        .subscribe(() => this.dataStorageService.getCustomers());
      this.close();
    } else if (!isSafeToDelete) {
      this.error = 'Customer still has unpacked products'
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  async safeToDelete(): Promise<boolean> {
    if (this.customer.id) {
      try {
        const result: boolean | undefined = await this.dataStorageService.hasUnpackedOrders(this.customer.id).toPromise();
        
        if (result !== undefined) {
          return !result;
        } else {
          throw new Error("Unexpected undefined result for hasUnpackedOrders")
        }
      } catch (error) {
        console.error("Error checking unpacked products:", error);
        return false;
      }
    }
    return false;
  }
  
  
}
