import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../../models/order";
import {Observable} from "rxjs";
import {Product} from "../../models/product";
import {Customer} from "../../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class ScanOrderService {
  baseURL = "http://localhost:8080/";

  constructor(private http: HttpClient) {

  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.baseURL+"orders");
  }

  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL+"products");
  }

  getProductsById(id: string): Observable<Product>{
    return this.http.get<Product>(this.baseURL+"products/"+id);
  }

  getProductsByProductNumber (productnumber: string): Observable<Product>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("productnumber",productnumber);
    return this.http.get<Product>(this.baseURL+"product",{params: queryParams});
  }


}
