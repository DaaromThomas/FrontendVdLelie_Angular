import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {Order} from "./models/order";
import {ScanOrderService} from "./services/scan-order.service";
import * as http from "http";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Product} from "./models/product";


@Component({
  selector: 'app-scan-order',
  templateUrl: './scan-order.component.html',
  styleUrl: './scan-order.component.css'
})
export class ScanOrderComponent {

  public orders: Order[] = [ new Order(13, "p", "asdf", 12)];
  public products: Product[] = [ new Product("test", new Order(13, "p", "asdf", 12), "test product", 123, "test type")];
  public packaging: string[] = ["test package", "other package"];
  public productColumns: string[] = [
    "Product",
    "Recommended Packaging",
    "Amount available"
  ];
  // private scanOrderService: ScanOrderService = new ScanOrderService();

  constructor(private scanOrderService: ScanOrderService){

  }

  getOrders(){
    console.log("answer1:");
    // console.log(this.orders);
    // this.scanOrderService.getOrders()
    //    .subscribe((data: Order[]) => this.orders = data);
    // console.log("answer2:");
    // console.log(this.orders);
  }

}
