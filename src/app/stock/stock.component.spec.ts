import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { StockComponent } from './stock.component';
import { DataStorageService } from '../services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { StockDeletePopupComponent } from './stock-delete-popup/stock-delete-popup.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;
  let mockDataStorageService: jasmine.SpyObj<DataStorageService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    mockDataStorageService = jasmine.createSpyObj('DataStorageService', ['getPackagesAndLocations', 'getCurrentStockId', 'updatePackage', 'deletePackage']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [StockComponent, StockDeletePopupComponent, StockTableComponent],
      providers: [
        { provide: DataStorageService, useValue: mockDataStorageService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      imports: [MatPaginatorModule, FormsModule, ReactiveFormsModule, MatTableModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    // Stub the async observable
    mockDataStorageService.allInventoryData$ = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
