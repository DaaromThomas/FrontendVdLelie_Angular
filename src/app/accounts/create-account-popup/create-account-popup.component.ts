import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../../services/data-storage.service';
import { Location } from '../../interfaces/location';
import { Signup } from '../../interfaces/signup.interface';

@Component({
  selector: 'app-create-account-popup',
  templateUrl: './create-account-popup.component.html',
  styleUrl: './create-account-popup.component.css'
})
export class CreateAccountPopupComponent {

  signup: Signup | undefined;
  employeenumber: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
  passcheck: string = "";
  notifications: boolean = false;
  selectedOption: string = "cdba1f68-f9e9-41c7-972e-0a12209763f4";

  subscription: any;

  locations: Location[] = [];

  error = '';

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
      if (this.password != this.passcheck) {
        this.error = "passwords do not match";
        return;
      }
      if (this.employeenumber == 0 || this.name == "" || this.email == "" || this.password == "" || this.passcheck == "") {
        this.error = "some fields are left empty";
        return;
      }
      this.signup = {
        employeenumber: this.employeenumber,
        username: this.name,
        password: this.password,
        locationID: this.selectedOption,
        email: this.email,
        notification: this.notifications
      };
      this.dataStorageService.postSignup(this.signup);
    }
    this.dialogRef.close();
  }

}
