import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Subject, tap, forkJoin } from 'rxjs';
import { Stock } from '../interfaces/stock';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseurl: string = 'http://localhost:8080';
  packageList$: Subject<Packaging[]> = new Subject<Packaging[]>();
  locationList$: Subject<Location[]> = new  Subject<Location[]>();
  private locationList: Location[] = [];
  stockList$: Subject<Stock[]> = new Subject<Stock[]>();
  locationNames: Subject<string[]> = new Subject<string[]>();
  constructor(private http: HttpClient) {}

  storePackage(newPackage: Packaging) {
    const httpOptions = {
      params: new HttpParams()
        .set('stockId', '4c491e42-46ed-4876-aa7b-4b4a10b91c32')
        .set('name', newPackage.name)
        .set('packagingGroup', newPackage.packagingGroup)
        .set('amount', newPackage.amountinstock)
        .set('minAmount', newPackage.minAmount),
    };

    return this.http
      .post(this.baseurl + '/packages', {}, httpOptions)
      .subscribe();
  }

  getPackagesAndLocations() {
    forkJoin([
    this.http.get(this.baseurl + '/packages'),
    this.http.get(this.baseurl + '/locations')
    ]).subscribe(([packages, locations]) => {
    this.locationList = locations as Location[];
    this.locationList$.next(locations as Location[]);
   
    if (Array.isArray(packages)) {
     const packagesWithLocations = packages.map((pack: Packaging) => {
       const location = this.calculateLocation(pack.stock?.id);
       return { ...pack, location };
     });
     this.packageList$.next(packagesWithLocations);
    } else {
     console.error('Packages data is not an array:', packages);
    }
    });
  }

  calculateLocation(stockId: string | undefined) {
    if (stockId != undefined) {
      let locationName: string = 't̵̘͛h̷̾ͅé̶͕ ̴̩͌v̸̬̂o̴̝̔i̴̖̊ḏ̵̐';
      for (let location of this.locationList) {
        let tempStock: Stock = location.stock;
        if (tempStock.id === stockId) {
          locationName = location.address;
        }
      }
      return locationName;
    }
    return 'missing id';
  }
}
