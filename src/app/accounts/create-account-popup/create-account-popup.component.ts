import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../../services/data-storage.service';
import { Product } from '../../models/product';
import { Account } from '../../interfaces/account.interface';
import { Location } from '../../interfaces/location';
import { AccountCreate } from '../../interfaces/account-create.interface';


@Component({
  selector: 'app-create-account-popup',
  templateUrl: './create-account-popup.component.html',
  styleUrl: './create-account-popup.component.css'
})
export class CreateAccountPopupComponent {
  locationList: Location[] = [];
  subscription: any;
  defaultLocation?: Location;


  constructor(
    public dialogRef: MatDialogRef<CreateAccountPopupComponent>,
    private dataStorageService: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public dialog: MatDialogModule
  ) {

  }


  newEmployee: AccountCreate = {
    location: this.defaultLocation!,
    employeenumber: 0,
    name: '',
    password: '',
    email: '',
    noitification: false
  }

  ngOnInit() {
    this.dataStorageService.getLocations();
    this.populateLocationData();
    this.dataStorageService.getLocationById("0b965849-6bba-428a-920a-94cc3b4fe821").subscribe((data: Location) => {
      this.defaultLocation = data;
    });
    
  }

  populateLocationData(): void {
    this.subscription = this.dataStorageService.locationList$.subscribe(
      (locationData) => {
        console.log(locationData);
        this.locationList = locationData;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onClose(save: boolean): void {
    if (save){

    }
    this.dialogRef.close();
  }

}
