import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DataStorageService } from '../../services/data-storage.service';
import { Packaging } from '../../interfaces/packaging';
import { SelectedPackaging } from '../models/selected-packaging';
import { Product } from '../../models/product';


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
    @Inject(MAT_DIALOG_DATA) public data: Product
    ) {

  }

  public ngOnInit(): void {
    this.dataStorageService.getPackagesAndLocations();
    this.populateInventoryData();
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
      this.dataStorageService.changeIsPackedRequest(false, this.data.productnumber).subscribe();
      this.dataStorageService.getPackageById(this.selectedOption).subscribe((data: Packaging) => {
        this.createNewLog(data);
      })
    }
  }

  createNewLog(data: Packaging){
    let selectedPackaging = new SelectedPackaging(data, this.quantity);
    for(const index in this.packageList){
      let packaging = this.packageList[index];
      if(packaging.id === selectedPackaging.selectedPackaging.id){
        let amount = packaging.amountinstock - selectedPackaging.amount;
        this.dataStorageService.updatePackageAmount(packaging.id, amount);
      }
    }
    
    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
