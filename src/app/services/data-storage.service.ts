import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Subject, forkJoin, Observable } from 'rxjs';
import { Stock } from '../interfaces/stock';
import { InventoryData } from '../interfaces/InventoryData.interface';
import { Account } from '../interfaces/account.interface';
import { ChangeIsPackedRequestData } from '../models/ChangeIsPackedRequestData';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private baseurl: string = 'http://localhost:8080';
  allInventoryData$: Subject<InventoryData> = new Subject<InventoryData>();
  locationList$: Subject<Location[]> = new Subject<Location[]>();
  private locationList: Location[] = [];
  private currentUser: string = '';
  private currentAccount: Account | undefined;
  private currentStock: Stock | undefined;
  private currentStockId: string = '';

  constructor(private http: HttpClient) {}

  storePackage(newPackage: Packaging) {
    const httpOptions = {
      params: new HttpParams()
        .set('stockId', this.currentStockId)
        .set('name', newPackage.name)
        .set('packagingGroup', newPackage.packagingGroup)
        .set('amount', newPackage.amountinstock)
        .set('minAmount', newPackage.minAmount),
    };
    return this.http.post(this.baseurl + '/packages', {}, httpOptions);
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
    return this.http.get<Packaging>(this.baseurl + '/packages/' + id);
  }

  setCurrentUser(user: string) {
    this.currentUser = user;
  }

  async getCurrentStockId() {
    await this.getCurrentLocation();
    await this.delay(1000) // this should probably not be allowed but genuinly cant think of a better fix rn
    this.getLocationStock();
  }

  getCurrentLocation(): Promise<Account> {
    const httpOptions = {
     params: new HttpParams().set('name', this.currentUser),
    };
   
    return this.http
     .get<Account>(this.baseurl + '/accounts/name', httpOptions)
     .toPromise()
     .then((res) => {
       if (res) {
         this.currentAccount = res;
         console.log(this.currentAccount);
         return this.currentAccount;
       } else {
         throw new Error('Failed to get current location');
       }
     });
   }
   
  getLocationStock() {
    if (this.currentAccount != undefined) {
     for (let location of this.locationList) {
       if (location.id === ((this.currentAccount.location as unknown) as Location).id) {
         this.currentStockId = location.stock.id
       }
     }
    }
   }

   delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
   }
   

   getStockId() {
    return this.currentStockId;
   }

  changeIsPackedRequest(isPacked: boolean, productNumber: number){
    let data: ChangeIsPackedRequestData = new ChangeIsPackedRequestData(isPacked, productNumber);
    return this.http.post("http://localhost:8080/product/ispacked", data);
  }

  updatePackageAmount(id: string | undefined, amount: number) {  
    const params = new HttpParams().set('amount', amount);
  
    return this.http.patch("http://localhost:8080/packages/" + id, null, { params }).subscribe();
  }
}
