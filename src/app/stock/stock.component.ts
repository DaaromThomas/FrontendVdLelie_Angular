import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Stock } from '../interfaces/stock';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Subject, takeUntil } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent {
 selection = new SelectionModel<Element>(true, []);
  subscription: any;
  displayPackage: boolean = false;
  applyBlur: boolean = false;
  tableWrapperClass: string = 'table-wrapper';
  locationFilter: string = '';
  packageList: Packaging[] = [];
  sortedList: Packaging[] = [];
  locationList: Location[] = [];
  stockList: Stock[] = [];
  locationNames: string[] = [];

  constructor(private fb: FormBuilder,
    private _formBuilder: FormBuilder, private dataStorageService: DataStorageService) {}


  onPackageChange(package_:Packaging){
    this.dataStorageService.updatePackage(package_);
  }
  onPackageDelete(package_:Packaging){
    this.dataStorageService.deletePackage(package_);
    this.sortedList = this.sortedList.filter((package__) => {
      return package__.id !== package_.id;
    });
    this.packageList = this.packageList.filter((package__) => {
      return package__.id !== package_.id;
    })
  }

  displayPackagePopup() {
    this.displayPackage = true;
    this.applyBlur = true;
    console.log(this.locationNames)

  }

onPopupClosed(isClosed: boolean) {
  this.displayPackage = isClosed;
  this.applyBlur = isClosed;
}

applyFilter() {
  if(this.locationFilter === '') {
    this.sortedList = this.packageList;
    return;
  }

  this.sortedList = this.packageList.filter((package_) => {
    return package_.location?.toLowerCase()?.includes(this.locationFilter.toLowerCase());
  });
}

  previousValue: string = '';

  onFocusChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.textContent != null) {
      this.previousValue = target.textContent;
    }
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const initialValue = target.textContent;
    if (initialValue !== null) {
      const newValue = initialValue.replace(/[^0-9]*/g, '');
      target.textContent = newValue;
      if (initialValue !== target.textContent) {
        event.stopPropagation();
      }
    }
  }

  onBlurChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.textContent === null || target.textContent.trim() === '') {
      target.textContent = this.previousValue;
    }
  }

  ngOnInit() {
    this.dataStorageService.getPackagesAndLocations();
    this.populateInventoryData();
    this.dataStorageService.getCurrentStockId();
  }

  populateInventoryData(): void {
    this.subscription = this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
      this.packageList = inventoryData.packageList;
      this.sortedList = inventoryData.packageList;
      this.locationList = inventoryData.locationList;
      this.locationNames = inventoryData.locationNames;
    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
