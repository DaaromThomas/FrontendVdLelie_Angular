import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from '../models/Log';
import { LogService } from './log.service';
import { Product } from '../models/product';
import { Account } from '../interfaces/account.interface';
import { DataStorageService } from '../services/data-storage.service';
import { Packaging } from '../interfaces/packaging';
import { MatTableDataSource } from '@angular/material/table';
import { log, time } from 'console';
import { MatPaginator } from '@angular/material/paginator';
import { app } from '../../../server';
import { Time } from '@angular/common';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  pageSize: number = 13;
  logs: Log[] = [];
  filteredLogs: MatTableDataSource<Log> = new MatTableDataSource<Log>([]);

  accounts!: Account[];
  filteredAccount!: Account;

  nameFilter!: string;
  productFilter!: string;
  filterDate!: Date | null;
  beginTime!: string | null;
  endTime!: string | null;

  displayedColumns: string[] = ['account', 'product', 'packaging', 'amount', 'dateTime', 'reverted']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public logService: LogService,
    public dataStorageService: DataStorageService,
  ) {}

  ngOnInit() {
    this.logService.getLogs();
    this.logService.logs().subscribe((logs) => {
      this.logs = logs;
      this.filteredLogs.data = logs.slice().reverse();
      this.filteredLogs.paginator = this.paginator;
    });
  }
  

  applyFilters() {
    let filteredLogs = this.logs.slice().reverse();
  
    if (this.nameFilter || this.productFilter || this.filterDate || this.beginTime || this.endTime) {
      filteredLogs = filteredLogs.filter(log => {
        if (log === null) {
          return false;
        }
  
        const nameMatches = !this.nameFilter || log.account.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        const productMatches = !this.productFilter || log.product.name.toLowerCase().includes(this.productFilter.toLowerCase());
        const dateMatches = this.dateMatches(log.date);
        const timeMatches = this.timeMatches(log.time);
  
        return nameMatches && productMatches && dateMatches && timeMatches;
      });
    }

    while (filteredLogs.length % this.pageSize !== 0) {
      filteredLogs.push(Object.create(null));
    }
  
    this.filteredLogs.data = filteredLogs;
    this.resetFilters();
  }

  private dateMatches(logDate: number[]): boolean {
    let date: string = logDate[0] + "," + logDate[1] + "," + logDate[2];
    
    if(this.beginTime && this.endTime && !this.filterDate){
      this.filterDate = new Date();
    }
    else if(!this.filterDate){
      return true;
    }
    try {
      const logDateObj = new Date(date);
      const filterDate = new Date(this.filterDate); 
      return logDateObj.toDateString() === filterDate.toDateString();
    } catch (error) {
      console.error('Error processing date:', error);
      return false;
    }
  }

  private timeMatches(timeArray: number[]): boolean {
    if (this.beginTime && this.endTime) {
      const logTime = this.convertTimeToShowableString(timeArray);
      return logTime >= this.beginTime && logTime <= this.endTime;
    }
    return true;
  }

  private resetFilters() {
    this.nameFilter = '';
    this.productFilter = '';
    this.filterDate = null;
    this.beginTime = null;
    this.endTime = null;
  }

  revertLog(log: Log) {
    log.reverted = true;
    this.logService.revertLog(log);
  }

  
  convertDateToShowableString(date: number[]): string{
    const year: string = date[0].toString();
    const month: string = date[1].toString().padStart(2, '0');
    const day: string = date[2].toString().padStart(2, '0');
    const string: string = year + " - " + month + " - " + day
    return string;
  }

  convertTimeToShowableString(time: number[]): string {
    const hour: string = time[0].toString().padStart(2, '0');
    const minute: string = time[1].toString().padStart(2, '0');
    
    return hour + ":" + minute;
  }
}
