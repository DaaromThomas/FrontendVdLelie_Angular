import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataStorageService} from "../../services/data-storage.service";
import {Product} from "../../models/product";
import {ScanOrderService} from "../services/scan-order.service";
import {Customer} from "../../interfaces/customer.interface";

@Component({
  selector: 'app-filter-by-customer-popup',
  templateUrl: './filter-by-customer-popup.component.html',
  styleUrl: './filter-by-customer-popup.component.css'
})
export class FilterByCustomerPopupComponent {
  public customers: Customer[] = [];
  public products: Product[] = [];

  private subscription: any;

  public filter: string = '';
  public filterIsHidden = false;
  public selectedCustomer: Customer | undefined = undefined;

  public errorMessage = "";

  constructor(
    public dialogRef: MatDialogRef<FilterByCustomerPopupComponent>,
    private dataStorageService: DataStorageService,
    public dialog: MatDialog,
    private scanOrderService: ScanOrderService
  ) {  }

  ngOnInit(){
    this.dataStorageService.getCustomers();
    this.populateCustomerData();
    window.setTimeout(() => document.getElementById('filter')!.focus(), 0);
  }

  private populateCustomerData(): void {
    this.subscription = this.dataStorageService.customerList$.subscribe(
        (customerData) => {
          this.customers = customerData;
        }
    );
  }

  public getFilteredCustomers(){
    let filteredList: Customer[] = [];
    if(this.filter == ''){
      filteredList = this.customers;
    }else{
      for(let i = 0; i<this.customers.length; i++){
        if(this.customers[i].name.toLowerCase().includes(this.filter.toLowerCase())){
          filteredList.push(this.customers[i]);
        }
      }
    }
    return filteredList;
  }

  public getCustomerProducts(){
    let customerId = this.selectedCustomer?.id;
    let customerProducts = [];
    for(let i = 0; i<this.products.length; i++){
      if(this.products[i].order.customer.id == customerId){
        customerProducts.push(this.products[i]);
      }
    }
    return customerProducts;
  }

  public selectCustomer(customer: Customer){
    this.filterIsHidden = true;
    this.selectedCustomer = customer;
    this.scanOrderService.getProducts().subscribe((data: any) => {
      this.products= data;
    });
  }

  public selectProduct(product: Product){
    if(!product.packed){
      this.dialogRef.close({data: product});
    }else{
      this.errorMessage="product is already packed";
    }
  }

  public onBackToCustomers(){
    this.filterIsHidden = false;
    window.setTimeout(() => document.getElementById('filter')!.focus(), 0);
    this.errorMessage = "";
  }

  public onClose(){
    this.dialogRef.close({data:''});
  }
}
