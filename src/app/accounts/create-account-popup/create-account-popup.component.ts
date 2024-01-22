import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../../services/data-storage.service';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-create-account-popup',
  templateUrl: './create-account-popup.component.html',
  styleUrl: './create-account-popup.component.css'
})
export class CreateAccountPopupComponent {

  name: string = "";
  email: string = "";
  password: string = "";
  passcheck: string = "";
  notifications: boolean = false;
  selectedOption: string = "cdba1f68-f9e9-41c7-972e-0a12209763f4";

  subscription: any;

  locations: Location[] = [];

  constructor(public dialogRef: MatDialogRef<CreateAccountPopupComponent>, public dialog: MatDialog, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.populateLocations();
  }

  populateLocations() {
    this.dataStorageService.getPackagesAndLocations();
    this.subscription = this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
      this.locations = inventoryData.locationList;
    })
  }

  closeDialog(save: boolean) {
    if (save == true) {
      console.log(this.name + " " + this.email + " " + this.password + " " + this.passcheck + " " + this.notifications + " " + this.selectedOption);

    }
    this.dialogRef.close();
  }

}
