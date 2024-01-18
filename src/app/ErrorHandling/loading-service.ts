import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingcomponentComponent } from './loadingcomponent/loadingcomponent.component';

@Injectable({
  providedIn: 'root',
  
})
export class LoadingService {
  private loadingDialogRef: MatDialogRef<LoadingcomponentComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  showLoading() {
    if (!this.loadingDialogRef) {
      this.loadingDialogRef = this.dialog.open(LoadingcomponentComponent, {
        disableClose: true,
        panelClass: 'loading-dialog-container',
      });
    }
  }

  hideLoading() {
    if (this.loadingDialogRef) {
      this.loadingDialogRef.close();
      this.loadingDialogRef = null;
    }
  }
}
