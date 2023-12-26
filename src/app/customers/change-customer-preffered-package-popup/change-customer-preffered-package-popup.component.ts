import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {Packaging} from "../../interfaces/packaging";

@Component({
  selector: 'app-change-customer-preffered-package-popup',
  templateUrl: './change-customer-preffered-package-popup.component.html',
  styleUrl: './change-customer-preffered-package-popup.component.css'
})
export class ChangeCustomerPrefferedPackagePopupComponent {
  subscription: any;
  packageList: Packaging[] = [];
  selectedOption: string = "";

  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input( {required: true} ) customerId: string = "none";

  constructor(private storageService: DataStorageService) {}

  public ngOnInit(): void {
    this.storageService.getPackagesAndLocations();
    this.populateInventoryData();
  }

  populateInventoryData(): void {
    this.subscription = this.storageService.allInventoryData$.subscribe((inventoryData) => {
      this.packageList = inventoryData.packageList;
    })
  }

  public setPrefferedPackage(){
    if(this.selectedOption != ""){
      this.storageService.setCustomerPrefferedPackage(this.customerId, this.selectedOption);
      this.popupClosed.emit(true);
    }
  }

  public closeWindow(){
    this.popupClosed.emit(true);
  }


}
