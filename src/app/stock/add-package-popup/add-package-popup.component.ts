import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';
import { Packaging } from '../../models/packaging';

@Component({
  selector: 'app-add-package-popup',
  templateUrl: './add-package-popup.component.html',
  styleUrl: './add-package-popup.component.css',
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

  error: string = '';

  constructor(private storageService: DataStorageService) {}

  done(): void {
    this.amountErrorHidden = true;
    const packaging: Packaging = {
      packagingGroup: this.newPackage.value.group,
      amountinstock: this.newPackage.value.amount,
      minAmount: this.newPackage.value.minAmount,
      name: this.newPackage.value.name
    };

    if (packaging === undefined) {
    } else if (this.checkNewPackage(packaging)) {
      if (this.checkAmount(packaging)) {
        this.amountErrorHidden = false;
        return;
      } else {
        this.popupClosed.emit(false);
        this.addPackage.emit(packaging);
        this.savePackage(packaging);
      }
    }
  }

  close(): void {
    this.popupClosed.emit(false);
  }

  checkNewPackage(packaging: Packaging): boolean {
    let propertyName: string | undefined;

    if (!packaging.name) {
      propertyName = 'name';
    } else if (!packaging.packagingGroup) {
      propertyName = 'group';
    } else if (!packaging.amountinstock) {
      propertyName = 'amount';
    } else if (!packaging.minAmount) {
      propertyName = 'minAmount';
    }

    if (propertyName) {
      this.error = `${propertyName} is undefined.`;
      return false;
    }

    return true;
  }

  savePackage(packaging: Packaging) {
     this.storageService.storePackage(packaging);
  }

  checkAmount(packaging: Packaging): boolean {
    const amount: number = Number(packaging.amountinstock);
    const minAmount: number = Number(packaging.minAmount);
    if (isNaN(amount)) {
      this.error = 'Amount is not a number';
      return true;
    } else if (isNaN(minAmount)) {
      this.error = 'Minimal amount is not a number';
      return true;
    } else if (amount < minAmount) {
      this.error = 'Amount is less than minimal amount';
      return true;
    }
    return false;
  }
}
