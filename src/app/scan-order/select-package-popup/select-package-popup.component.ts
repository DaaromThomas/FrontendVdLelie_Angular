import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'



@Component({
  selector: 'app-select-package-popup',
  templateUrl: './select-package-popup.component.html',
  styleUrl: './select-package-popup.component.css'
})
export class SelectPackagePopupComponent {
  selectedOption: string | undefined;
  quantity: number | undefined;

  constructor(public dialogRef: MatDialogRef<SelectPackagePopupComponent>) {

  }
  onClose(cancelled: boolean = false): void {
    if (cancelled) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
    }
  }
}
