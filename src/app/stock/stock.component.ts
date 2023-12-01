// stock.component.ts
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
  displayPackage: boolean = false;
  applyBlur: boolean = false;
  tableWrapperClass: string = 'table-wrapper';
  locationFilter: string = '';
  packageList: Packaging[] = [];
  locationList: Location[] = [];
  stockList: Stock[] = [];
  locationNames: string[] = [];

  private unsubscribe$ = new Subject<void>();

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
    this.http.getPackagesAndLocations();
    this.populateLocation();
    this.populateStock();
    this.populateLocationNames();
  }
   
  populateStock(): void {
    this.http.packageList$
     .pipe(takeUntil(this.unsubscribe$))
     .subscribe(packages => {
       console.log('packages: ', packages)
       this.packageList = packages;
    });
  }
   
  populateLocation(): void {
    this.http.locationList$
     .pipe(takeUntil(this.unsubscribe$))
     .subscribe(locations => {
       console.log("locations: ", locations)
       this.locationList = locations;
    });
  }

  populateLocationNames(): void {
    this.http.locationNames$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(locationNames => {
        console.log("locationNames: ", locationNames)
        this.locationNames = locationNames;
      })
  }
   
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
