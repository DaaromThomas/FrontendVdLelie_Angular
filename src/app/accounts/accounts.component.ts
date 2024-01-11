import { Component } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { DataStorageService } from '../services/data-storage.service';
import { debug } from 'console';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accountList: Account[] = [];
  subscription: any;

  constructor(
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit() {
    this.dataStorageService.getAccounts();
    this.populateAccountData();
  }

  populateAccountData(): void {
    this.subscription = this.dataStorageService.accountList$.subscribe(
      (accountData) => {
        console.log(accountData);
        this.accountList = accountData;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
