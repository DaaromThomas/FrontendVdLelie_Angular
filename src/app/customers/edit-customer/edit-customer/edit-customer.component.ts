import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../../interfaces/customer.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerValidationService } from '../../CustomerValidationService'; 

@Component({
 selector: 'app-edit-customer',
 templateUrl: './edit-customer.component.html',
 styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {
 customerForm: FormGroup;
 customer: Customer;
 error: string = '';
 intlTelInput: any;

 constructor(
 public dialogRef: MatDialogRef<EditCustomerComponent>,
 @Inject(MAT_DIALOG_DATA) public data: any,
 private formBuilder: FormBuilder,
 private customerValidationService: CustomerValidationService
 ) {
 this.customer = data.customer;
 this.customerForm = this.customerValidationService.createForm(this.customer);
 }

 close() {
 this.dialogRef.close();
 }

 onSubmit() {
 if (this.customerValidationService.checkValidCustomer(this.customerForm.value)) {
  // Here you can handle the form submission.
  // For example, you can update the customer's data.
  console.log(this.customerForm.value);
 } else {
  this.error = 'Invalid customer data';
 }
 }
}
