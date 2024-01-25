import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FilterByCustomerPopupComponent } from './filter-by-customer-popup.component';
import { DataStorageService } from '../../services/data-storage.service';

describe('FilterByCustomerPopupComponent', () => {
  let component: FilterByCustomerPopupComponent;
  let fixture: ComponentFixture<FilterByCustomerPopupComponent>;
  let dialogRef: MatDialogRef<FilterByCustomerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByCustomerPopupComponent],
      imports: [MatDialogModule, HttpClientTestingModule, FormsModule], // Add FormsModule to imports
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        DataStorageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterByCustomerPopupComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
