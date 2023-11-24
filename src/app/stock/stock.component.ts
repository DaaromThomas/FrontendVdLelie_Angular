// stock.component.ts
import { Component } from '@angular/core';
import { Packaging } from '../interfaces/packaging.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  displayPackage: boolean = false;

  stock: Packaging[] = [
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam')
  ];

  mockLocations: string[] = [
    'Rotterdam', 'Amsterdam', 'Brabant'
  ];

  displayPackagePopup() {
    this.displayPackage = true;
  }

  onPopupClosed(isClosed: boolean) {
    console.log("onPopupClosed()");
    this.displayPackage = isClosed;
  }

  addPackage(packaging: any){
    console.log("addpackage() + ", packaging);
    
    const newPackage: Packaging = new Packaging(
      packaging.group,
      'auto-generated-id',
      packaging.amount,
      packaging.minAmount,
      packaging.name,
      'some-location'
    );

    this.stock.push(newPackage);
    console.log(this.stock);  
  }
}
