import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Packaging } from "../models/packaging.model";


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    baseurl: string = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    storePackage(newPackage: Packaging) {
        const name: string = newPackage.getName;
        const group = newPackage.getGroup;
        const amount = newPackage.getAmount;
        const minAmount = newPackage.getMinAmount;
        
        const httpOptions = {
            params: new HttpParams()
                .set('stockId', '4c491e42-46ed-4876-aa7b-4b4a10b91c32')
                .set('name', name)
                .set('packagingGroup', group)
                .set('amount', amount)
                .set('minAmount', minAmount)
        };
    
        return this.http.post(this.baseurl+"/packages", {}, httpOptions)
            .subscribe(data => {});
    }

    getPackages() {
        return this.http.get(this.baseurl+"/packages", {});
    }    

    getLocations() {
        return this.http.get(this.baseurl+'/locations', {});
    }
    
}
