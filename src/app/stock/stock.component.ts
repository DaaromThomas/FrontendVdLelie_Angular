// stock.component.ts
import { Component } from '@angular/core';
import { Packaging } from '../interfaces/packaging.model';
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

  stock: Packaging[] = [
    new Packaging('dozen', '1', 2, 1, 'Rode Doos1', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos2', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos3', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos4', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos5', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos6', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos7', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos8', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos9', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos10', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos11', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos12', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos13', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos14', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos15', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos16', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos17', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos18', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos19', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos20', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos21', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos22', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos23', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos24', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos25', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos26', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos27', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos28', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos29', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos30', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos31', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos32', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos33', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos34', 'Amsterdam'),
  ];

  mockLocations: string[] = [
    'Rotterdam', 'Amsterdam', 'Brabant'
  ];

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
    this.stock.push(newPackage);
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

  onStockTest()  {
    this.http.getPackages();
  }

}
