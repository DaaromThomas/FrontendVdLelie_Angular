import {Component, HostListener, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DataStorageService } from '../../services/data-storage.service';
import { Packaging } from '../../interfaces/packaging';
import { SelectedPackaging } from '../models/selected-packaging';
import { Product } from '../../models/product';
import { EmailNotificationPopupComponent } from './email-notification-popup/email-notification-popup.component';
import { LogService } from '../../logs/log.service';
import { Account } from '../../interfaces/account.interface';
import { HttpParams } from '@angular/common/http';
import { Location } from '../../interfaces/location';
import {Stock} from "../../interfaces/stock";



@Component({
  selector: 'app-select-package-popup',
  templateUrl: './select-package-popup.component.html',
  styleUrl: './select-package-popup.component.css'
})
export class SelectPackagePopupComponent {
  subscription: any;
  packageList: Packaging[] = [];
  locationList: Location[] = [];


  selectedOption!: string;
  quantity: number = 1;



  constructor(
    public dialogRef: MatDialogRef<SelectPackagePopupComponent>,
    private dataStorageService: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public product: Product,

    public dialog: MatDialog, private logService: LogService
  ) {}

  public getPackagesFromCurrentLocation(): Packaging[]{
    let currentLocation: Location | undefined = this.dataStorageService.GAccount?.location;
    let sortedPackageList: Packaging[] = [];

    for(let i = 0; i<this.packageList.length; i++){
      if(this.packageList[i].location === currentLocation?.address){
        sortedPackageList.push(this.packageList[i]);
      }
    }
    return sortedPackageList;
  }



  public ngOnInit(): void {
    this.dataStorageService.getPackagesAndLocations();
    this.populateInventoryData();
    this.selectedOption = this.product.order.customer.preferredPackaging.id;
    // this.dataStorageService.getPackagesAndLocations();
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
      this.locationList = inventoryData.locationList;
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
            this.dataStorageService.sendEmail(amount, packaging.name, packaging.minAmount)
            this.openDialog()
          }
          this.error = '';

          const account: Account | undefined = this.dataStorageService.GAccount;
          if (account !== undefined) {
            this.sendLogToDB(account, this.product, data, this.quantity);
          }
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



  sendLogToDB(account: Account, product: Product, packaging: Packaging, packagingamount: number) {
    const httpParams: HttpParams = new HttpParams()
      .set('accountId', account.id)
      .set('productId', product.id)
      .set('packagingId', packaging.id)
      .set('packagingamount', packagingamount);

    this.logService.createLog(httpParams);
  }

}


