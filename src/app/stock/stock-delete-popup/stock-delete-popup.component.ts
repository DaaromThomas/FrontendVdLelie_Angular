import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-delete-popup',
  templateUrl: './stock-delete-popup.component.html',
  styleUrls: ['./stock-delete-popup.component.css'],
  
})
export class StockDeletePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<StockDeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}