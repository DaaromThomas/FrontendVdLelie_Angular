import {Component, HostListener, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DataStorageService } from '../../services/data-storage.service';
import { Packaging } from '../../interfaces/packaging';
import { SelectedPackaging } from '../models/selected-packaging';
import { Product } from '../../models/product';
import { Customer } from '../../models/Customer';
import { EmailNotificationPopupComponent } from './email-notification-popup/email-notification-popup.component';


@Component({
  selector: 'app-select-package-popup',
  templateUrl: './select-package-popup.component.html',
  styleUrl: './select-package-popup.component.css'
})
export class SelectPackagePopupComponent {
  subscription: any;
  packageList: Packaging[] = [];


  selectedOption!: string;
  quantity: number = 1;



  constructor(
    public dialogRef: MatDialogRef<SelectPackagePopupComponent>,
    private dataStorageService: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public dialog: MatDialog
  ) {

  }





  public ngOnInit(): void {
    this.dataStorageService.getPackagesAndLocations();
    this.populateInventoryData();

    this.selectedOption = this.product.order.customer.preferredPackaging.id;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.onClose(false);
    } else if (event.key === "Escape" || event.key === "Backspace"){
      this.onClose(true);
    }
  }

  populateInventoryData(): void {
    this.subscription = this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
      this.packageList = inventoryData.packageList;
    })
  }

  onClose(cancelled: boolean): void {
    if (cancelled) {
      this.dialogRef.close();
    } else {

      this.dataStorageService.getPackageById(this.selectedOption).subscribe((data: Packaging) => {
        this.processData(data);
      });
      this.dataStorageService.changeIsPackedRequest(true, this.product.productnumber).subscribe();
    }
  }

  error = '';

  processData(data: Packaging) {
    let selectedPackaging = new SelectedPackaging(data, this.quantity);
    for (const index in this.packageList) {
      let packaging = this.packageList[index];
      if (packaging.id === selectedPackaging.selectedPackaging.id) {
        let amount = packaging.amountinstock - selectedPackaging.amount;
        if (amount < 0) {
          this.error = 'Not enough packages';
          return;
        }
        else if (this.quantity < 1) {
          this.error = 'Quantity is to low';
          return;
        }
        else {
          this.dataStorageService.updatePackageAmount(packaging.id, amount);
          if (amount <= packaging.minAmount) {
            this.dataStorageService.sendEmail(amount, packaging.name)
            this.openDialog()
          }
          this.error = '';
        }
      }
    }

    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmailNotificationPopupComponent, {
      width: '750px',
    });
  }

}
