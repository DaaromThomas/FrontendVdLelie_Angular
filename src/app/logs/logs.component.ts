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
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[] = [];
  filteredLogs: Log[] = this.logs;
  private packageList: Packaging[] = [];

  accounts!: Account[];
  filteredAccount!: Account;

  nameFilter!: string;
  productFilter!: string;
  filterDate!: Date | null;
  beginTime!: string | null;
  endTime!: string | null;

  constructor(
    private logService: LogService,
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit() {
    this.dataStorageService.getAccountsByCurrentLocation().subscribe((data) => {
      this.accounts = data;
    });

    this.logService.getLogs();
    this.logService.logs().subscribe((logs) => {
      this.logs = logs;
      this.filteredLogs = logs;
    });

    this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
      this.packageList = inventoryData.packageList;
    });
  }

  applyFilters() {
    if (!this.nameFilter && !this.productFilter && !this.filterDate && !this.beginTime && !this.endTime) {
      this.filteredLogs = this.logs;
    } else {
      this.filteredLogs = this.logs.filter(log => {
        const nameMatches = !this.nameFilter || log.account.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        const productMatches = !this.productFilter || log.product.name.toLowerCase().includes(this.productFilter.toLowerCase());
        const dateMatches = this.dateMatches(log.date);
        const timeMatches = this.timeMatches(log.time);

        return nameMatches && productMatches && dateMatches && timeMatches;
      });
    }

    this.resetFilters();
  }
  private dateMatches(logDate: Date): boolean {
    if(this.beginTime && this.endTime && !this.filterDate){
      this.filterDate = new Date();
    }
    try {
      const logDateObj = new Date(logDate);
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
}
