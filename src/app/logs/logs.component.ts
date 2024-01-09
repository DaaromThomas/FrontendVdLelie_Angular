import { Component, OnInit } from '@angular/core';
import { Log } from '../models/Log';
import { LogService } from './log.service';
import { Product } from '../models/product';
import { Account } from '../interfaces/account.interface';
import { Packaging } from '../models/packaging.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit{
  logs: Log[] = [];

  constructor(
    private logService: LogService
  ){}

  ngOnInit() {
    this.logService.getLogs();
    this.logService.logs()
      .subscribe((logs) => {
        this.logs = logs;
      })
  }

  revertLog(log: Log){
    const product: Product = log.product;
    const account: Account = log.account;
    const packaging: Packaging = log.packaging;
    const packagingAmount = log.packagingamount;

    
  }


}
