import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Subject, tap, forkJoin, Observable } from 'rxjs';
import { Stock } from '../interfaces/stock';
import { InventoryData } from '../interfaces/InventoryData.interface';
import { ChangeIsPackedRequestData } from '../models/ChangeIsPackedRequestData';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private baseurl: string = 'http://localhost:8080';
  allInventoryData$: Subject<InventoryData> = new Subject<InventoryData>();
  locationList$: Subject<Location[]> = new Subject<Location[]>();
  private locationList: Location[] = [];
  constructor(private http: HttpClient) { }

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
      .post(this.baseurl + '/packages', {}, httpOptions);
  }

  getPackagesAndLocations() {
    forkJoin([
      this.http.get(this.baseurl + '/packages'),
      this.http.get(this.baseurl + '/locations'),
    ]).subscribe(([packages, locations]) => {
      this.locationList = locations as Location[];
      const locationNames = this.locationList.map(
        (location) => location.address
      );
      const locationList = locations as Location[];
      const packageList = Array.isArray(packages)
        ? packages.map((pack: Packaging) => {
          const location = this.calculateLocation(pack.stock?.id);
          return { ...pack, location };
        })
        : [];
      const inventoryData: InventoryData = {
        packageList,
        locationList,
        locationNames,
      };
      this.allInventoryData$.next(inventoryData);
    });
  }

  calculateLocation(stockId: string | undefined) {
    if (stockId != undefined) {
      let locationName: string = 'deleted location';
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




  getPackageById(id: String): Observable<Packaging> {
    return this.http.get<Packaging>(this.baseurl + "/packages/" + id)
  }

  changeIsPackedRequest(isPacked: boolean, productNumber: number){
    let data: ChangeIsPackedRequestData = new ChangeIsPackedRequestData(isPacked, productNumber);
    console.log(data);
    return this.http.post("http://localhost:8080/product/ispacked", data);
  }
}
