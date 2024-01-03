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
  error: string = ''; //thinking of displaying an error when the customer still has orders opened but maybe have an overrule button that also cascades and deletes those orders then?

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

  onDelete(): void {
    if (this.customer.id) {
      this.dataStorageService
        .deleteCustomer(this.customer.id)
        .subscribe(() => this.dataStorageService.getCustomers());
    } //should probably throw an error here
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
