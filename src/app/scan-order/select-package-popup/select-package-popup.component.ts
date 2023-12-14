import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DataStorageService } from '../../services/data-storage.service';
import { Packaging } from '../../interfaces/packaging';
import { SelectedPackaging } from '../models/selected-packaging';
import { Product } from '../../models/product';
import { Customer } from '../../models/Customer';


@Component({
  selector: 'app-select-package-popup',
  templateUrl: './select-package-popup.component.html',
  styleUrl: './select-package-popup.component.css'
})
export class SelectPackagePopupComponent {
  subscription: any;
  packageList: Packaging[] = [];


  selectedOption!: String;
  quantity: number = 1;

  

  constructor(
    public dialogRef: MatDialogRef<SelectPackagePopupComponent>, 
    private dataStorageService: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public product: Product
    ) {

  }

  public ngOnInit(): void {
    this.dataStorageService.getPackagesAndLocations();
    this.populateInventoryData();

    this.selectedOption = this.product.prefferedpackage.id;
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
  
  processData(data: Packaging){
    let selectedPackaging = new SelectedPackaging(data, this.quantity);
    for(const index in this.packageList){
      let packaging = this.packageList[index];
      if(packaging.id === selectedPackaging.selectedPackaging.id){
       let amount = packaging.amountinstock - selectedPackaging.amount;
        if(amount < 0){
          this.error = 'Not enough packages';
          return;
        }
        else if(this.quantity < 1){
          this.error = 'Quantity is to low';
          return;
        }
        else{
          this.dataStorageService.updatePackageAmount(packaging.id, amount);
          this.dataStorageService.sendEmail(amount, selectedPackaging.selectedPackaging.name);
          this.error = '';
        }
      }
    }
    
    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
