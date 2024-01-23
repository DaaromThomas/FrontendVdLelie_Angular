import { Injectable, OnInit } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { Account } from '../interfaces/account.interface';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnInit{
  private baseurl: string = 'http://localhost:8080/logs';

  private logList: Log[] = [];
  private logList$: BehaviorSubject<Log[]> = new BehaviorSubject<Log[]>([]);

  private accountsInCurrentLocation!: Account[];

  constructor(
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(){
  }

  public logs(): Observable<Log[]> {
    return this.logList$.asObservable();
  }

  public getLogs() {
    this.http.get<Log[]>(this.baseurl)
      .subscribe((logs) => {
        this.logList = logs.sort((a, b) => {
          const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2]).getTime();
          const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2]).getTime();
  
          if (dateA !== dateB) {
            return dateB - dateA;
          }
  
          const timeA = a.time[0] * 3600 + a.time[1] * 60 + a.time[2];
          const timeB = b.time[0] * 3600 + b.time[1] * 60 + b.time[2];
  
          return timeB - timeA;
        });

        this.logList.reverse();
  
        this.logList$.next(this.logList);
      });
  }
  
  

  public createLog(params: HttpParams){

    this.http.post(this.baseurl, params).subscribe();
  }

  revertLog(log: Log) {
    const body = {
        logId: log.id,
        packagingId: log.packaging.id,
        productId: log.product.id,
        packagingAmount: log.packagingamount
    };

    return this.http.patch(this.baseurl, body).subscribe();
  }


  
}
