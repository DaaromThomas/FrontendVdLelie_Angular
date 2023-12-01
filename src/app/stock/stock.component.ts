import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Stock } from '../interfaces/stock';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent {
  subscription: any;
  displayPackage: boolean = false;
  applyBlur: boolean = false;
  tableWrapperClass: string = 'table-wrapper';
  locationFilter: string = '';
  packageList: Packaging[] = [];
  locationList: Location[] = [];
  stockList: Stock[] = [];
  locationNames: string[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  displayPackagePopup() {
    this.displayPackage = true;
    this.applyBlur = true;
  }

  onPopupClosed(isClosed: boolean) {
    this.displayPackage = isClosed;
    this.applyBlur = isClosed;
  }

  setLocationFilter(location: Event) {
    let filterValue = (event?.target as HTMLInputElement).value;
    this.locationFilter = filterValue;
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
  }

  populateInventoryData(): void {
    this.subscription = this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
      this.packageList = inventoryData.packageList;
      this.locationList = inventoryData.locationList;
      this.locationNames = inventoryData.locationNames;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
