import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../../interfaces/customer.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerValidationService } from '../../CustomerValidationService';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnDestroy {
  customerForm: FormGroup;
  customer: Customer;
  error: string = '';
  intlTelInput: any;
  mutationObserver!: MutationObserver;
  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private customerValidationService: CustomerValidationService,
    private renderer: Renderer2
  ) {
    this.customer = data.customer;
    this.customerForm = this.customerValidationService.createForm(
      this.customer
    );
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (
      this.customerValidationService.checkValidCustomer(this.customerForm.value)
    ) {
      // Here you can handle the form submission.
      // For example, you can update the customer's data.
      console.log(this.customerForm.value);
    } else {
      this.error = 'Invalid customer data';
    }
  }

  applyStyles() {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newNodes = Array.from(mutation.addedNodes);
          newNodes.forEach((node) => {
            if (this.isFlagContainer(node)) {
              this.renderer.setStyle(node, 'display', 'contents');
            }
          });
        }
      });
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  isFlagContainer(node: Node): node is HTMLElement {
    return (
      (node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).classList?.contains('iti__flag-container'))
    );
  }
}
