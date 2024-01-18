import { ErrorHandler, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule()
export class GlobalErrorHandler extends ErrorHandler {
  private isDialogOpen = false;

  constructor(private dialog: MatDialog) {
    super();
  }

  override handleError(error: any) {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;

      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {
          errorData: error
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
      });
    }
  }
}

