import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { Packaging } from '../models/packaging';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseurl: string = 'http://localhost:8080';
  balls: Location[] = [];
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

  getPackages() {
    return this.http.get(this.baseurl + '/packages', {});
  }

  getLocations() {
    return this.http.get(this.baseurl + '/locations');
  }
}
