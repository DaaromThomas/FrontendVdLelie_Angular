import { Component, ViewChild } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountPopupComponent } from './create-account-popup/create-account-popup.component';
import { NoPermissionsForThisComponent } from './no-permissions-for-this/no-permissions-for-this.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accountList: Account[] = [];
  subscription: any;

  currentUser: string = "";

  nameFilter: string = '';
  roleFilter: string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'role', 'email', 'notification', 'delete'];

  constructor(
    private dataStorageService: DataStorageService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<Account>(this.accountList);
  }

  ngOnInit() {
    this.populateAccountData();

  }

  populateAccountData(): void {
    this.dataStorageService.getAccounts();
    this.subscription = this.dataStorageService.accountList$.subscribe(
      (accountData) => {
        this.accountList = accountData;

        this.applyFilters();
        this.dataSource.paginator = this.paginator;
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


  editRole(account: Account, role: string): void {
    this.dataStorageService.editRole(account, role);
  }

  applyFilters(): void {
    this.dataSource.data = this.accountList
      .filter(account =>
        account.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        account.role.toLowerCase().includes(this.roleFilter.toLowerCase()));
  }

}
