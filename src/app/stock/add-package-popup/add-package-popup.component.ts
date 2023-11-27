import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';
import { Packaging } from '../../interfaces/packaging.model';

@Component({
  selector: 'app-add-package-popup',
  templateUrl: './add-package-popup.component.html',
  styleUrl: './add-package-popup.component.css'
})
export class AddPackagePopupComponent {
  amountErrorHidden = true;
  newPackage: FormGroup = new FormGroup({
    name: new FormControl(''),
    group: new FormControl(''),
    amount: new FormControl(''),
    minAmount: new FormControl(''),
  });

  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addPackage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private storageService: DataStorageService){}
  
  done(): void {
    this.amountErrorHidden = true;
    const newPackage = this.checkNewPackage();
    if(newPackage === undefined){

    } else {
      if(this.checkAmount(newPackage)){
        this.amountErrorHidden = false;
      }
      this.popupClosed.emit(false);
      this.addPackage.emit(newPackage);
      this.savePackage(newPackage);
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
    }
  
    if (propertyName) {
      this.error = `${propertyName} is undefined.`;
      return { error: this.error, propertyName };
    }
  
    return packaging;
  }
  

  savePackage(packaging: Packaging){
    this.storageService.storePackage(packaging);
  }

  checkAmount(packaging: Packaging): boolean {
    const amount = packaging.getAmount;
    console.log(amount);
  
    if (isNaN(amount)) {
      this.error = 'Amount must be a number.';
      return false;
    }
  
    return true;
  }
  
  
  
  
  
}
