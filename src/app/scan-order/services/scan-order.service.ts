import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../../models/order";
import {Observable} from "rxjs";
import {Product} from "../../models/product";

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

  getProductsById(id: number): Observable<Product>{
    return this.http.get<Product>(this.baseURL+"products/"+id)
  }

}
