import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {Order} from "./models/order";
import {ScanOrderService} from "./services/scan-order.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Product} from "./models/product";


@Component({
  selector: 'app-scan-order',
  templateUrl: './scan-order.component.html',
  styleUrl: './scan-order.component.css'
})
export class ScanOrderComponent {

  public orders: Order[] = [ new Order(13, "p", "asdf", 12)];
  public products: Product[] = [
      new Product("test", new Order(13, "p", "asdf", 12), "test product", 123, "test type"),
      new Product( "test package", new Order(14, "pp", "test order", 13), "test product 2", 123456, "test product type")
  ];
  public packaging: string[] = ["test package", "other package"];
  public productColumns: string[] = [
    "Product",
    "Recommended Packaging",
    "Amount available"
  ];
  selectedIndex = -1;
  InputOrderNumber = '';
  errorMessage = '';

  constructor(private scanOrderService: ScanOrderService){

  }

  public get getErrorMessage(){
    return this.errorMessage;
  }

  public selectProduct(index: number){
    if(this.selectedIndex == index){
      this.selectedIndex=-1;
    }
    else{
      this.selectedIndex = index;
    }
  }

  public onInputOrderNumber(event: Event){
    this.InputOrderNumber = (<HTMLInputElement>event.target).value;
  }

  public getOrders(){
    if(this.InputOrderNumber === null || this.InputOrderNumber === ''){
      this.errorMessage="please scan a product";
    } else if(isNaN(Number(this.InputOrderNumber))){
      this.errorMessage = 'must be a valid ordernumber';
    } else{
      this.errorMessage = '';
      this.scanOrderService.getProduct()
          .subscribe((data: Product[]) => this.products = data);
      console.log(this.orders);
    }

  }


}
