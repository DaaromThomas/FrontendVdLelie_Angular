import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScanOrderService {
  baseURL = "http://localhost:8080/";

  constructor(private http: HttpClient) {

  }

  getOrdersTemp(){

  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.baseURL+"orders");
  }

}
