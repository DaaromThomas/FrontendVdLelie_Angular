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
  filteredLogs!: MatTableDataSource<Log>;
  private packageList: Packaging[] = [];

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
    private logService: LogService,
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit() {
    this.filteredLogs = new MatTableDataSource();
    this.dataStorageService.getAccountsByCurrentLocation().subscribe((data) => {
      this.accounts = data;
    });

    this.logService.getLogs();
    this.logService.logs().subscribe((logs) => {
      this.logs = logs;
      this.filteredLogs.data = logs.slice().reverse();
      this.appendNullObjects();      
      this.filteredLogs.paginator = this.paginator;
    });

    this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
      this.packageList = inventoryData.packageList;
    });
  }

  applyFilters() {
    let filteredLogs = this.logs.slice().reverse();
  
    if (this.nameFilter || this.productFilter || this.filterDate || this.beginTime || this.endTime) {
      filteredLogs = filteredLogs.filter(log => {
        if (log === null) {
          return false; // Exclude null objects from filtering
        }
  
        const nameMatches = !this.nameFilter || log.account.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        const productMatches = !this.productFilter || log.product.name.toLowerCase().includes(this.productFilter.toLowerCase());
        const dateMatches = this.dateMatches(log.date);
        const timeMatches = this.timeMatches(log.time);

        console.log(nameMatches, productMatches, dateMatches, timeMatches)
  
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
    let date: string = logDate[0] + "," + logDate[1] + "," + logDate[2]
    if(this.beginTime && this.endTime && !this.filterDate){
      this.filterDate = new Date();
    }
    try {
      const logDateObj = new Date(date);
      const filterDate = new Date(this.filterDate as Date);
      return logDateObj.toDateString() === filterDate.toDateString();
    } catch (error) {
      console.error('Error processing date:', error);
      return false;
    }
  }

  private timeMatches(timeArray: number[]): boolean {
    if (this.beginTime && this.endTime) {
      const logTime = this.convertLogTimeToString(timeArray);
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

  private convertLogTimeToString(timeArray: number[]): string {
    if (timeArray.length >= 3) {
      const hoursStr = this.padZero(timeArray[0]);
      const minutesStr = this.padZero(timeArray[1]);
      return `${hoursStr}:${minutesStr}`;
    } else {
      console.error('Invalid time format:', timeArray);
      return '';
    }
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  revertLog(log: Log) {
    log.reverted = true;
    this.logService.revertLog(log);
  }

  private appendNullObjects() {
    while (this.filteredLogs.data.length % this.pageSize !== 0) {
      this.filteredLogs.data.push(Object.create(null))
    }
  }

  
  convertDateToShowableString(log: Log): string{
    const year: string = log.date[0].toString();
    const month: string = log.date[1].toString().padStart(2, '0');
    const day: string = log.date[2].toString().padStart(2, '0');
    const string: string = year + " - " + month + " - " + day
    return string;
  }

  convertTimeToShowableString(log: Log): string {
    const hour: string = log.time[0].toString().padStart(2, '0');
    const minute: string = log.time[1].toString().padStart(2, '0');
    
    return hour + ":" + minute;
  }
}
