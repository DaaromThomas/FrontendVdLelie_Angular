import { Component, EventEmitter, Output, AfterViewInit, Renderer2, OnDestroy, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';
import { Customer } from '../../interfaces/customer.interface';
import { CustomerValidationService } from '../CustomerValidationService';
import { MatDialogRef } from '@angular/material/dialog';
import { Packaging } from '../../interfaces/packaging';

declare var intlTelInput: any;

@Component({
  selector: 'app-add-customer-popup',
  templateUrl: './add-customer-popup.component.html',
  styleUrls: ['./add-customer-popup.component.css'],
})
export class AddCustomerPopupComponent implements AfterViewInit, OnDestroy {
  customerList: Customer[] = [];
  newCustomerForm: FormGroup;
  preferredPackage!: string;
  packageList: Packaging[] = [];
  subscription: any;

  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  error: string = '';
  phoneInput: any;
  mutationObserver!: MutationObserver;

  constructor(public dialogRef: MatDialogRef<AddCustomerPopupComponent>, private dataStorageService: DataStorageService, private renderer: Renderer2, private customerValidationService: CustomerValidationService) {
    this.newCustomerForm = this.customerValidationService.createEmptyForm()
  }

  ngOnInit() {
    this.dataStorageService.getCustomers();
    this.dataStorageService.customerList$.subscribe((customerData) => {
      this.customerList = customerData;
    });
    this.dataStorageService.getPackagesAndLocations();
    this.populatePackageList();
  }

  ngAfterViewInit() {
    const input = document.querySelector('#phonenumber-input');
    this.phoneInput = intlTelInput(input, {
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      initialCountry: 'nl',
      preferredCountries: ['nl', 'ro'],
    });
    this.applyStyles();
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  populatePackageList(): void {
    this.subscription = this.dataStorageService.allInventoryData$.subscribe((inventoryData) => {
      this.packageList = inventoryData.packageList;
    })
  }

  submitForm(): void {
    let newCustomer: Customer = {
      ...this.newCustomerForm.value,
      phonenumber: this.customerValidationService.getFormattedPhoneNumber(this.phoneInput),
      preferredPackaging: this.preferredPackageGetter()
    }

    newCustomer.number = this.customerList.length + 1;

      if (newCustomer === undefined) {
        return;
      }
      if (this.customerValidationService.checkValidCustomer(newCustomer)) {
        this.dialogRef.close();
        this.saveCustomer(newCustomer);
        return;
      } else {
        this.error = "Some required fields are empty"
      }
  }

  preferredPackageGetter(): Packaging | null {
    for (let packaging of this.packageList) {
      if (packaging.id == this.preferredPackage) {
        return packaging;
      }
    }
    return null;
  }

  discardForm(): void {
    this.dialogRef.close();
  }

  saveCustomer(customer: Customer) {
    this.dataStorageService
      .storeCustomer(customer)
      .subscribe(() => this.dataStorageService.getCustomers());
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

    this.mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  isFlagContainer(node: Node): node is HTMLElement {
    return (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as HTMLElement).classList?.contains('iti__flag-container')
    );
  }
}
