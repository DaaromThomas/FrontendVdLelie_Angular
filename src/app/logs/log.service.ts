import { Injectable, OnInit } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnInit{
  private logURL: string = 'http://localhost:8080/logs';

  private logList: Log[] = [];
  private logList$: BehaviorSubject<Log[]> = new BehaviorSubject<Log[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(){
  }

  public logs(): Observable<Log[]> {
    return this.logList$.asObservable();
  }

  public getLogs(){
    this.http.get<Log[]>(this.logURL)
      .subscribe((logs) => {
        this.logList = logs;
        this.logList$.next(this.logList);
      })
  }

  
}
