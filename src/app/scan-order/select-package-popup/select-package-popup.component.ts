import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { DataStorageService } from '../../services/data-storage.service';
import { Packaging } from '../../interfaces/packaging';
import { SelectedPackaging } from '../models/selected-packaging';



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

  constructor(public dialogRef: MatDialogRef<SelectPackagePopupComponent>, private dataStorageService: DataStorageService) {

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
      this.dataStorageService.getPackageById(this.selectedOption).subscribe((data: Packaging) => {
        this.dialogRef.close(new SelectedPackaging(data, this.quantity))
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
