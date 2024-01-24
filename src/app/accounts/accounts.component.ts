import { Component, ViewChild } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountPopupComponent } from './create-account-popup/create-account-popup.component';
import { NoPermissionsForThisComponent } from './no-permissions-for-this/no-permissions-for-this.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ThisIsYouComponent } from './this-is-you/this-is-you.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accountList: Account[] = [];
  subscription: any;

  accountsPerPage: number = 2;

  currentUser: string = "";

  nameFilter: string = '';
  roleFilter: string = '';

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
        this.dataSource.data = this.accountList
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    if (this.dataStorageService.GAccount!.role == 'ROLE_USER') { this.openNoPermissionDialog(); return; }
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

  openNotificationDialog() {
    const dialogRef = this.dialog.open(ThisIsYouComponent, {
      width: '750px',
    });
  }


  deleteUser(id: string) {
    if (this.dataStorageService.GAccount!.role == 'ROLE_USER') { this.openNoPermissionDialog(); return; }
    if (this.dataStorageService.GAccount!.id == id) { this.openNotificationDialog(); return; }
    this.dataStorageService.deleteAccount(id);
  }


  editRole(account: Account, role: string): void {
    if (this.dataStorageService.GAccount!.role == 'ROLE_USER') { this.openNoPermissionDialog(); return; }
    if (this.dataStorageService.GAccount!.id == account.id) { this.openNotificationDialog(); return; }
    this.dataStorageService.editRole(account, role);
  }

  applyFilters(): void {
    this.dataSource.data = this.accountList
      .filter(account =>
        account.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        account.role.toLowerCase().includes(this.roleFilter.toLowerCase())
      );
  }

}
