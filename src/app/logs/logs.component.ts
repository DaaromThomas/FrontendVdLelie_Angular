import { Component, OnInit } from '@angular/core';
import { Log } from '../models/Log';
import { LogService } from './log.service';
import { Product } from '../models/product';
import { Account } from '../interfaces/account.interface';
import { DataStorageService } from '../services/data-storage.service';
import { Packaging } from '../interfaces/packaging';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit{
  logs: Log[] = [];
  private packageList: Packaging[] = [];

  constructor(
    private logService: LogService,
    private dataStorageService: DataStorageService 
  ){}

  ngOnInit() {
    this.logService.getLogs();
    this.logService.logs()
      .subscribe((logs) => {
        this.logs = logs;
      })

      this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
        this.packageList = inventoryData.packageList;
      })
  }

  revertLog(log: Log){
    const product: Product = log.product;
    const packaging: Packaging = log.packaging;
    const packagingAmount = log.packagingamount;


    //Make sure this works
    packaging.amountinstock += packagingAmount;

    
    this.dataStorageService.changeIsPackedRequest(false, product.productnumber);
  }


}
