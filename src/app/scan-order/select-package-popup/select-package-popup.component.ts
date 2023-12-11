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
    console.log(this.data);
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
      this.dataStorageService.changeIsPackedRequest(true, this.data.productnumber).subscribe(
        (response) => {
          // Handle the response data here
          
          console.log('Response change is packed request:', response);
        },
        (error) => {
          // Handle errors here
          console.error('Error:', error);
        });
      this.dataStorageService.getPackageById(this.selectedOption).subscribe((data: Packaging) => {
        this.dialogRef.close(new SelectedPackaging(data, this.quantity))
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
