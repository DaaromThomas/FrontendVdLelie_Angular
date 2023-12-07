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

  public orders: Order[] = [ new Order(13, "p", "asdf", 12)];
  public products: Product[] = [

  ];
  public packaging: string[] = ["test package", "other package"];
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
  productNumber = new FormGroup({
    productnumber: new FormControl('')
  });

  constructor(private scanOrderService: ScanOrderService){  }

  public get getErrorMessage(){
    return this.errorMessage;
  }

  public onInputOrderNumber(event: Event){
    this.InputProductNumber = (<HTMLInputElement>event.target).value;
  }

  public getOrders(){
    console.log("test");
    this.testProductNumber(1234);
    if(this.InputProductNumber === null || this.InputProductNumber === ''){
      this.errorMessage="please scan a product";
    } else if(isNaN(Number(this.InputProductNumber))){
      this.errorMessage = 'must be a valid product number';
    } else{
      this.errorMessage = '';
      this.scanOrderService.getProduct()
          .subscribe((data: any[]) => {
            // console.log(data);
            this.products = data;
            let productNumberIndex = this.findProductNumber(Number(this.InputProductNumber));
            if(productNumberIndex==-1){
              this.errorMessage = 'Product not found';
            }else{
              this.errorMessage = '';
              this.scannedProduct = data.at(productNumberIndex);
              this.productName = data.at(productNumberIndex).name;
              this.packageName = data.at(productNumberIndex).prefferedpackage.name;
              this.amountAvailable = data.at(productNumberIndex).prefferedpackage.amountinstock;
            }
          });
    }
  }

  private findProductNumber(productNumber: number){
    let products = this.products;
    for(let i=0; i<products.length; i++){
      if(products[i].productnumber==productNumber){
        return i;
      }
    }
    return -1;
  }

  private testProductNumber(productnumber: number) {
      this.scanOrderService.getProductsByProductName(productnumber)
          .subscribe((data: any) => {
              console.log("data:");
              console.log(data);
          });
      this.scanOrderService.getProductsById("a577f518-0242-4755-be35-91760d943123")
          .subscribe((data: any) => {
              console.log(data);
          });
      // this.scanOrderService.getCustomerByName("Thomas")
      //     .subscribe((data: any) =>{
      //       console.log("customer:");
      //       console.log(data);
      //     });
  }

}
