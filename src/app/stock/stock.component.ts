import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Stock } from '../interfaces/stock';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Subject, takeUntil } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StockDeletePopupComponent } from './stock-delete-popup/stock-delete-popup.component';


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
  nameFilter: string = '';
  groupFilter: string = '';
  packageList: Packaging[] = [];
  sortedList: Packaging[] = [];
  locationList: Location[] = [];
  stockList: Stock[] = [];
  locationNames: string[] = [];

  selectedSortProperty: string = 'minAmount';
  selectedSortOrder: string = 'asc';


  constructor(private dataStorageService: DataStorageService, public dialog: MatDialog) { }


  onPackageChange(package_: Packaging) {
    this.dataStorageService.updatePackage(package_);
  }
  onPackageDelete(package_: Packaging) {
    const dialogRef = this.dialog.open(StockDeletePopupComponent, {
      data: { package_: package_ },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataStorageService.deletePackage(package_);
        this.sortedList = this.sortedList.filter((package__) => {
          return package__.id !== package_.id;
        });
        this.packageList = this.packageList.filter((package__) => {
          return package__.id !== package_.id;
        })
      }
    });

  }

  displayPackagePopup() {
    this.displayPackage = true;
    this.applyBlur = true;
  }

  onPopupClosed(isClosed: boolean) {
    this.displayPackage = isClosed;
    this.applyBlur = isClosed;
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

  applyFilter() {
    if (this.locationFilter === '' && this.nameFilter === '' && this.groupFilter === '') {
      this.sortedList = this.packageList;
      return;
    }

    this.sortedList = this.packageList.filter((package_) => {
      const matchesLocation = package_.location?.toLowerCase()?.includes(this.locationFilter.toLowerCase()) || this.locationFilter === '';
      const matchesName = package_.name?.toLowerCase()?.includes(this.nameFilter.toLowerCase()) || this.nameFilter === '';
      const matchesGroup = package_.packagingGroup?.toLowerCase()?.includes(this.groupFilter.toLowerCase()) || this.groupFilter === '';

      return matchesLocation && matchesName && matchesGroup;
    });


    this.sortedList.sort((a, b) => {
      const aAmount = (a as any).amount || 0;
      const bAmount = (b as any).amount || 0;
      const aMinAmount = (a as any).minAmount || 0;
      const bMinAmount = (b as any).minAmount || 0;


      if (aMinAmount !== bMinAmount) {
        return aMinAmount - bMinAmount;
      }


      return aAmount - bAmount;
    });
  }

  sortList() {
    const sortBy = this.selectedSortProperty;
    const sortOrder = this.selectedSortOrder === 'asc' ? 1 : -1;

    this.sortedList = this.packageList.slice().sort((a, b) => {
      const aValue = (a as any)[sortBy] || 0;
      const bValue = (b as any)[sortBy] || 0;
      return (aValue - bValue) * sortOrder;
    });
  }
}
