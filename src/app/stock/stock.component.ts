// stock.component.ts
import { Component } from '@angular/core';
import { Packaging } from '../interfaces/packaging.model';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  displayPackage: boolean = false;
  tableWrapperClass: string = 'table-wrapper';

  stock: Packaging[] = [
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam'),
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
    console.log("addPackage()");
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
}
