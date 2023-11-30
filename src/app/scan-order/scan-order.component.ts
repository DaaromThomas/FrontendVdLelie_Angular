import { Component } from '@angular/core';
import {Order} from "../models/order";
import {ScanOrderService} from "./services/scan-order.service";
import {Product} from "../models/product";
import {Packaging} from "../models/packaging.model";


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
      this.scanOrderService.getProduct()
          .subscribe((data: any[]) => {
            this.products = data;
            let productNumberIndex = this.findProductNumber(Number(this.InputProductNumber));
            if(productNumberIndex==-1){
              this.errorMessage = 'Product not found';
            }else{
              this.errorMessage = '';
              this.scannedProduct = data.at(productNumberIndex);
              this.packageName = data.at(productNumberIndex).prefferedpackage.name;
              this.amountAvailable = data.at(productNumberIndex).prefferedpackage.amountinstock;
              console.log(data.at(productNumberIndex).prefferedpackage);
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


}
