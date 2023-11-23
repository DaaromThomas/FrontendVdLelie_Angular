import { Component } from '@angular/core';
import { Packaging } from '../interfaces/packaging.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  stock: Packaging[] = [
    new Packaging('dozen', '1', 2, 1, 'Rode Doos', 'Rotterdam'),
    new Packaging('dozen', '2', 20, 10, 'Blauwe Doos', 'Amsterdam')
  ];

  mockLocations: string[] = [
    'Rotterdam', 'Amsterdam', 'Brabant'
  ];

}
