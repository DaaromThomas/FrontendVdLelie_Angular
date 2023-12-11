import { Component } from '@angular/core';
import {Order} from "../models/order";
import {ScanOrderService} from "./services/scan-order.service";
import {Product} from "../models/product";
import {Packaging} from "../models/packaging.model";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-scan-order',
  templateUrl: './scan-order.component.html',
  styleUrl: './scan-order.component.css'
})
export class ScanOrderComponent {

  public products: Product[] = [];
  public productColumns: string[] = [
    "Product",
    "Recommended Packaging",
    "Amount available"
  ];
  public scannedProduct: Product = new Product("", new Packaging(0, "", 2, "-", "", ""), new Order(13, "p", "asdf", 12), "-", 123, "test type");
  public InputProductNumber = '';
  public errorMessage = '';

  public productName = '-';
  public packageName = '-';
  public amountAvailable = 0;

  constructor(private scanOrderService: ScanOrderService){  }

  public get getErrorMessage(){
    return this.errorMessage;
  }

  public onInputOrderNumber(event: Event){
    this.InputProductNumber = (<HTMLInputElement>event.target).value;
  }

  public getOrders(){
    if(this.InputProductNumber === null || this.InputProductNumber === ''){
      this.errorMessage="please scan a product";
    } else if(isNaN(Number(this.InputProductNumber))){
      this.errorMessage = 'must be a valid product number';
    } else{
      this.errorMessage = '';
      this.scanOrderService.getProductsByProductNumber(this.InputProductNumber)
          .subscribe((data: any) => {
            if(data == null){
              this.errorMessage = 'Product not found';
            }else{
              this.errorMessage = '';
              this.scannedProduct = data;
              this.productName = data.name;
              this.packageName = data.prefferedpackage.name;
              this.amountAvailable = data.prefferedpackage.amountinstock;
            }
          });
    }
  }




}
