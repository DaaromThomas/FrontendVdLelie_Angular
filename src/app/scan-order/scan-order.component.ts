import { Component } from '@angular/core';
import { Packaging } from '../models/packaging.model';
import { Order } from '../models/order';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../models/product';
import { SelectPackagePopupComponent } from './select-package-popup/select-package-popup.component';
import { ScanOrderService } from './services/scan-order.service';
import { UUID } from 'crypto';





@Component({
  selector: 'app-scan-order',
  templateUrl: './scan-order.component.html',
  styleUrl: './scan-order.component.css'
})
export class ScanOrderComponent {

  public packages: Packaging[] = [
    new Packaging(10, 'TestID', 5, 'TestName', 'TestGroup', 'TestLocation')
  ];
  // public orders: Order[] = [new Order(13, "p", "asdf", 12)];
  // public products: Product[] = [
  //   new Product("test", this.packages[0],new Order(13, "p", "asdf", 12), "test product", 123, "test type"),
  //   new Product("test package", this.packages[0], new Order(14, "pp", "test order", 13), "test product 2", 123456, "test product type")
  // ];
  public packaging: string[] = ["test package", "other package"];
  public productColumns: string[] = [
    "Product",
    "Recommended Packaging",
    "Amount available"
  ];
  public scannedProduct!: Product;
  public InputProductNumber = '';
  public errorMessage = '';

  public productName = '-';
  public packageName = '-';
  public amountAvailable = 0;

  selectedProduct: Product | undefined = undefined;

  selectedIndex = -1;

  constructor(private scanOrderService: ScanOrderService, public dialog: MatDialog) { }


  public get getErrorMessage() {
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
            if(data === null){
              console.log("Error" + data);
              this.errorMessage = 'Product not found';
            }else if(data.packed === true){
              this.errorMessage = 'Product is already packed';
            }else{
              this.errorMessage = '';
              this.scannedProduct = data;
              this.productName = data.name;
              this.packageName = data.prefferedpackage.name;
              this.amountAvailable = data.prefferedpackage.amountinstock;

              this.selectedProduct = data;
              this.openDialog();
            }
          });

    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelectPackagePopupComponent, {
      width: '750px',
      data: this.selectedProduct
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  public selectProduct(index: number) {
    if (this.selectedIndex == index) {
      this.selectedIndex = -1;
    }
    else {
      this.selectedIndex = index;
    }
  }





}
