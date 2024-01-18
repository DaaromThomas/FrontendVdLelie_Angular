import { Component } from '@angular/core';
import { Packaging } from '../models/packaging.model';
import { Order } from '../models/order';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../models/product';
import { SelectPackagePopupComponent } from './select-package-popup/select-package-popup.component';
import { ScanOrderService } from './services/scan-order.service';

@Component({
  selector: 'app-scan-order',
  templateUrl: './scan-order.component.html',
  styleUrl: './scan-order.component.css'
})
export class ScanOrderComponent {
  public packaging: string[] = ["test package", "other package"];
  public scannedProduct!: Product;
  public InputProductNumber = '';
  public errorMessage = '';
  public disableScan = false;

  public productName = '-';
  public packageName = '-';
  public amountAvailable = 0;
  public isDialogOpen = false;

  selectedProduct: Product | undefined = undefined;

  selectedIndex = -1;

  constructor(private scanOrderService: ScanOrderService, public dialog: MatDialog) { }

    public ngOnInit(): void {
      document.getElementById('productNumberInput')!.focus();
    }

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
              this.errorMessage = 'Product not found';
            }else if(data.packed === true){
              this.errorMessage = 'Product is already packed';
            }else{
              this.errorMessage = '';

              this.selectedProduct = data;

              this.openDialog();
              window.setTimeout(() => document.getElementById('productNumberInput')!.blur(), 0);
            }
          });

    }
  }

  public onEnter(){
    if(!this.isDialogOpen){
      document.getElementById('scanButton')!.click();
    }
  }

  openDialog() {
    this.isDialogOpen = true;
    this.disableScan = true;
    const dialogRef = this.dialog.open(SelectPackagePopupComponent, {
      width: '750px',
      data: this.selectedProduct
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      this.disableScan = false;
      window.setTimeout(() => document.getElementById('productNumberInput')!.focus(), 0);
    });
  }


}
