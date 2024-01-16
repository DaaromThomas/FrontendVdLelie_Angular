import { Injectable, OnInit } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnInit{
  private baseurl: string = 'http://localhost:8080/logs';

  private logList: Log[] = [];
  private logList$: BehaviorSubject<Log[]> = new BehaviorSubject<Log[]>([]);

  constructor(
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(){
  }

  public logs(): Observable<Log[]> {
    return this.logList$.asObservable();
  }

  public getLogs(){
    this.http.get<Log[]>(this.baseurl)
      .subscribe((logs) => {
        this.logList = logs;
        this.logList$.next(this.logList);
      })
  }

  public createLog(params: HttpParams){

    this.http.post(this.baseurl, params).subscribe((data) => {
      console.log(data);
    });
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
