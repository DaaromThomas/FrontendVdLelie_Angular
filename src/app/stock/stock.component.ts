// stock.component.ts
import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AddPackagePopupComponent } from './add-package-popup/add-package-popup.component';

import { Stock } from '../models/stock';
import { Location } from '../models/location';
import { Packaging } from '../models/packaging';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent {
  displayPackage: boolean = false;
  applyBlur: boolean = false;
  tableWrapperClass: string = 'table-wrapper';
  locationFilter: string = '';

  packageList: Packaging[] = [];
  locationList: Location[] = [];
  stockList: Stock[] = [];
  locationNames: string[] = [];

  constructor(private http: DataStorageService) {}

  displayPackagePopup() {
    this.displayPackage = true;
    this.applyBlur = true;
  }

  onPopupClosed(isClosed: boolean) {
    this.displayPackage = isClosed;
    this.applyBlur = isClosed;
  }

  addPackage(packaging: Packaging) {
    const newPackage: Packaging = packaging;
    this.http.storePackage(newPackage);
    this.packageList.push(packaging);
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
    this.populateStock();
  }

  populateStock(): void {
    this.http
      .getLocations()
      .subscribe((data) => this.fillLists(data as Location[]));
  }

  fillLists(locations: Location[]) {
    if (Array.isArray(locations)) {
      for (let location of locations) {
        this.locationList.push(location);
        this.locationNames.push(location.address);
        this.stockList.push(location.stock);
      }

      this.http
        .getPackages()
        .subscribe((data) => this.fillPackageList(data as Packaging[]));
    }
  }

  fillPackageList(packaging: Packaging[]) {
    packaging.map(
      (pack) => (pack.location = this.calculateLocation(pack.stock?.id))
    );
    this.packageList = packaging;
  }

  calculateLocation(stockId: string | undefined) {
    if (stockId != undefined) {
      let locationName: string = '';
      for (let location of this.locationList) {
        let tempStock: Stock = location.stock;
        if (tempStock.id === stockId) {
          locationName = location.address;
        }
      }
      return locationName;
    }
    return 'undefined';
  }

  onStockTest2() {
    this.http.getPackages().subscribe((data) => {
      console.log(data);
    });
  }

  onStockTest3() {
    this.http.getLocations().subscribe((data) => {
      console.log(data);
    });
  }
}
