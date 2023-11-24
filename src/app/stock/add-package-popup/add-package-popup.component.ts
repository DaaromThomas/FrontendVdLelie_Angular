import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-package-popup',
  templateUrl: './add-package-popup.component.html',
  styleUrl: './add-package-popup.component.css'
})
export class AddPackagePopupComponent {
  newPackage: FormGroup = new FormGroup({
    name: new FormControl(''),
    group: new FormControl(''),
    amount: new FormControl(''),
    minAmount: new FormControl(''),
  });

  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addPackage: EventEmitter<any> = new EventEmitter<any>();
  
  done(): void {
    const newPackage = this.checkNewPackage();
    if(newPackage === undefined){

    } else {
      this.popupClosed.emit(false);
      this.addPackage.emit(newPackage);
    }
  }

  close(): void {
    this.popupClosed.emit(false);
  }

  error: string = '';
  checkNewPackage(): any {
    const packaging = this.newPackage.value;
    let propertyName: string | undefined;
  
    if (!packaging.name) {
      propertyName = 'name';
    } else if (!packaging.group) {
      propertyName = 'group';
    } else if (!packaging.amount) {
      propertyName = 'amount';
    } else if (!packaging.minAmount) {
      propertyName = 'minAmount';
    } else {
      return packaging;
    }
  
    this.error = `${propertyName} is undefined.`;
    return undefined;
  }
  
}
