import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
 providedIn: 'root'
})
export class CustomerValidationService {

 constructor() { }

 createForm(customer: any): FormGroup {
   return new FormGroup({
     name: new FormControl(customer.name, Validators.required),
     address: new FormControl(customer.address, Validators.required),
     phonenumber: new FormControl(customer.phonenumber, Validators.required),
     email: new FormControl(customer.email, [Validators.required, Validators.email])
   });
 }

 checkValidCustomer(customer: any): boolean {
   if (!customer.name) {
     return false;
   }
   if (!customer.address) {
     return false;
   }
   if (!customer.email || !this.validateEmail(customer.email)) {
     return false;
   }
   return true;
 }

 validateEmail(email: string) {
   var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email);
 }

 getFormattedPhoneNumber(phoneInput: any): string | null {
  if (phoneInput) {
    const fullNumber = phoneInput.getNumber();
    if (fullNumber === '') {
      return null;
    }
    const fullNumberString = fullNumber.toString();
    const countryData = phoneInput.getSelectedCountryData();
    const countryCode = countryData.dialCode;
 
    const formattedNumber = '+' + countryCode + ' ' + fullNumberString.replace('+' + countryCode, '');
    return formattedNumber;
  }
  return null;
 }
 
 updateFormValue(form: FormGroup, key: string, value: any): void {
  (form.controls[key] as FormControl).setValue(value);
 }
 
}
