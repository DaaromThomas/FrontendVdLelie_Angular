import { Component } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { DataStorageService } from '../services/data-storage.service';
import { debug } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountPopupComponent } from './create-account-popup/create-account-popup.component';
import { NoPermissionsForThisComponent } from './no-permissions-for-this/no-permissions-for-this.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accountList: Account[] = [];
  subscription: any;

  currentUser: string = "";

  constructor(
    private dataStorageService: DataStorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.populateAccountData();
  }

  populateAccountData(): void {
    this.dataStorageService.getAccounts();
    this.subscription = this.dataStorageService.accountList$.subscribe(
      (accountData) => {
        this.accountList = accountData;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateAccountPopupComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openNoPermissionDialog() {
    const dialogRef = this.dialog.open(NoPermissionsForThisComponent, {
      width: '750px',
    });
  }


  deleteUser(id: string) {
    this.dataStorageService.deleteAccount(id);
  }



}
