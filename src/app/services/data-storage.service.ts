import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Subject, forkJoin, Observable, BehaviorSubject, takeUntil } from 'rxjs';
import { Stock } from '../interfaces/stock';
import { InventoryData } from '../interfaces/InventoryData.interface';
import { Account } from '../interfaces/account.interface';
import { ChangeIsPackedRequestData } from '../models/ChangeIsPackedRequestData';
import { Customer } from '../interfaces/customer.interface';

import { CookieService } from '../login/cookie.service';
import { Log } from '../models/Log';

import { Signup } from '../interfaces/signup.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private baseurl: string = environment.apiUrl;
  allInventoryData$: Subject<InventoryData> = new Subject<InventoryData>();
  locationList$: Subject<Location[]> = new Subject<Location[]>();
  private locationList: Location[] = [];
  private currentAccount: Account | undefined;
  private currentStockId: string = '';
  isDataLoaded$ = new BehaviorSubject<boolean>(false);
  customerList$: Subject<Customer[]> = new Subject<Customer[]>();
  accountList$: Subject<Account[]> = new Subject<Account[]>();

  constructor(private http: HttpClient) { }

  storePackage(newPackage: Packaging) {
    const httpOptions = {
      params: new HttpParams()
        .set('stockId', this.currentStockId)
        .set('name', newPackage.name)
        .set('packagingGroup', newPackage.packagingGroup)
        .set('amount', newPackage.amountinstock)
        .set('minAmount', newPackage.minAmount),
    };

    return this.http
      .post(this.baseurl + '/packages', {}, httpOptions);
  }

  storeCustomer(newCustomer: Customer) {
    let params = new HttpParams();
    params = params.set('customerNumber', newCustomer.number);
    params = params.set('name', newCustomer.name);
    params = params.set('address', newCustomer.address);
    params = params.set('email', newCustomer.email);

    if (newCustomer.phonenumber != null) {
      params = params.set('phonenumber', newCustomer.phonenumber);
    }

    if (newCustomer.preferredPackaging != null) {
      params = params.set('preferredPackageId', newCustomer.preferredPackaging.id!);
    }


    const httpOptions = {
      params: params
    };

    return this.http.post(this.baseurl + '/customers', {}, httpOptions);
  }

  public getAccountsByCurrentLocation() {
    return this.http.get<Account[]>(this.baseurl + '/accountsbylocation/' + this.currentAccount?.location.id);
  }

  getPackagesAndLocations() {
    this.isDataLoaded$.next(false);
    forkJoin([
      this.http.get<Packaging[]>(this.baseurl + '/packages'),
      this.http.get<Location[]>(this.baseurl + '/locations'),
    ]).subscribe(([packages, locations]: [Packaging[], Location[]]) => {
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
      this.isDataLoaded$.next(true);
    });
  }

  getCustomers() {
    this.http.get<Customer[]>(this.baseurl + '/customers').subscribe((customers: Customer[]) => {
      this.customerList$.next(customers);
    })
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

  async getCurrentStockId() {
    const unsubscribe$ = new Subject<void>();
    this.allInventoryData$.pipe(takeUntil(unsubscribe$)).subscribe(isLoaded => {
      if (isLoaded) {
        this.getLocationStock().then(() => {
          unsubscribe$.next();
          unsubscribe$.complete();
        });
      }
    })
  }

  async setCurrentAccount() {
    let currentUser = await this.getCurrentUser();
    const httpOptions = {
      params: new HttpParams().set('name', currentUser),
    };

    this.http
      .get<Account>(this.baseurl + '/accounts/name', httpOptions)
      .toPromise()
      .then((res) => {
        if (res) {
          this.currentAccount = res;
        } else {
          throw new Error('Failed to get current location');
        }
      });
  }

  getLocationStock(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.currentAccount != undefined) {
        for (let location of this.locationList) {
          if (location.id === ((this.currentAccount.location as unknown) as Location).id) {
            this.currentStockId = location.stock.id
          }
        }
        resolve();
      } else {
        reject("Current account is undefined");
      }
    });
   }


  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStockId() {
    return this.currentStockId;
  }

  async getCurrentUser(): Promise<string> {
    try {
      const response = await this.http.get(this.baseurl + '/currentuser', { responseType: 'text' }).toPromise();
      if (!response) {
        throw new Error('Failed to get current user');
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
   }

  changeIsPackedRequest(isPacked: boolean, productNumber: number) {
    let data: ChangeIsPackedRequestData = new ChangeIsPackedRequestData(isPacked, productNumber);
    return this.http.post(this.baseurl + "/product/ispacked", data);
  }

  updatePackageAmount(id: string | undefined, amount: number) {
    const params = new HttpParams().set('amount', amount);

    return this.http.patch(this.baseurl + "/packages/" + id, null, { params }).subscribe();
  }
  updatePackage(packaging: Packaging) {
    this.http.put(this.baseurl + '/packages/update', packaging).subscribe();
  }
  deletePackage(packaging: Packaging) {
    this.http.delete(this.baseurl + '/packages/' + packaging.id).subscribe();
  }

  updateCustomer(params: HttpParams, customerId: string) {
    return this.http.patch(this.baseurl + "/customers/" + customerId, null, { params });
  }

  deleteCustomer(customerId: string) {
    return this.http.delete(this.baseurl + "/customers/" + customerId);
  }

  hasUnpackedOrders(customerId: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseurl + "/customers/" + customerId + "/hasUnpackedProducts");
  }

  sendEmail(amount: number, name: string, minAmount: Number) {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('name', name)
      .set('minAmount', minAmount.toString());

    return this.http.post(this.baseurl + '/email/lowonstock', null, { params }).subscribe();
  }


  get GAccount() {
    return this.currentAccount
  }

  getAccounts() {
    this.http.get<Account[]>(this.baseurl + '/accounts').subscribe((accounts: Account[]) => {
      this.accountList$.next(accounts);
    })
  }

  getLocations() {
    this.http.get<Location[]>(this.baseurl + '/locations').subscribe((locations: Location[]) => {
      this.locationList$.next(locations);
    })
  }

  getLocationById(id: String): Observable<Location> {
    return this.http.get<Location>(this.baseurl + '/locations/' + id);
  }

  postSignup(signup: Signup) {
    this.http.post(this.baseurl + '/signup', signup).subscribe(
      (res) => {
        this.getAccounts();
      },
      (error) => {
        console.log(error)
      }
    );
  }

  deleteAccount(id: string) {
    return this.http.delete(this.baseurl + "/accounts/" + id).subscribe(() => { this.getAccounts(); });
  }

  editRole(account: Account, role: string) {
    const params = new HttpParams()
      .set('role', role);

    return this.http.patch(this.baseurl + "/accounts/" + account.id, null, { params }).subscribe(() => { this.getAccounts(); });
  }
}



