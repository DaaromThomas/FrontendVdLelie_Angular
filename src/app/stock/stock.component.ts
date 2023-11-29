// stock.component.ts
import { Component } from '@angular/core';
import { Packaging } from '../models/packaging.model';
import { Locations } from '../models/location.model';
import { Stock } from '../models/stock.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  displayPackage: boolean = false;
  tableWrapperClass: string = 'table-wrapper';
  locationFilter: string = '';

  packageList: Packaging[] = [];
  locationList: Locations[] = [];
  stockList: Stock[] = [];
  locationNames: string[] = [];

  constructor(private http: DataStorageService){}

  displayPackagePopup() {
    this.displayPackage = true;
    this.tableWrapperClass = this.displayPackage ? 'table-wrapper-expanded' : 'table-wrapper';
  }

  onPopupClosed(isClosed: boolean) {
    this.displayPackage = isClosed;
    this.tableWrapperClass = this.displayPackage ? 'table-wrapper-expanded' : 'table-wrapper';
  }

  
  addPackage(packaging: Packaging){
    const newPackage: Packaging = this.createPackaging(packaging);
    this.http.storePackage(newPackage);
    this.packageList.push(newPackage);
  }

  createPackaging(packaging: any): Packaging{
    const newPackage: Packaging = new Packaging(
      packaging.group,
      'auto-generated-id',
      packaging.amount,
      packaging.minAmount,
      packaging.name,
      'current-location'
    );
    return newPackage;
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

  ngOnInit()  {
    this.populateStock();
  }

  populateStock(): void {
    this.http.getLocations().subscribe(data => this.fillLists(data))
  }

  getLocationName() {
  }

  fillLists (data: any) {
    if (Array.isArray(data)) {
      data.forEach(item => {
        console.log(item.id)
        let stock = new Stock(item.stock.id, item.stock.stocknumber)
        item = new Locations(item.id, item.address, stock)
        this.stockList.push(stock);
        this.locationList.push(item);
        this.locationNames.push(item.address)
      })

      this.http.getPackages().subscribe(data => this.fillPackageList(data))
    }
  }

  fillPackageList (data: any) {
    if (Array.isArray(data)) {
      data.forEach(item => {
        let locationName: string = '';
        for (let location of this.locationList) {
          let tempStock: Stock = location.getStock
          if (tempStock.getId === item.stock.id ) {
            locationName = location.getAddress;
          }
        }
        item = new Packaging(item.amountinstock, item.id, item.minAmount, item.name, item.packagingGroup, locationName);
        this.packageList.push(item);
     });
    }
  }

  onStockTest2() {
    this.http.getPackages().subscribe(data => {
      console.log(data)
    });
  }

  onStockTest3() {
    this.http.getLocations().subscribe(data => {
      console.log(data)
    })
  }

}
