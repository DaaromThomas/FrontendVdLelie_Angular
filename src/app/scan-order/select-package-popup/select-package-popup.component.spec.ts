import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectPackagePopupComponent } from './select-package-popup.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataStorageService } from '../../services/data-storage.service';
import { of } from 'rxjs';
import { SelectedPackaging } from '../models/selected-packaging';
import { Packaging } from '../../interfaces/packaging';

describe('SelectPackagePopupComponent', () => {
  let component: SelectPackagePopupComponent;
  let fixture: ComponentFixture<SelectPackagePopupComponent>;
  let matDialogRef: MatDialogRef<SelectPackagePopupComponent>;
  let dataStorageServiceSpy: jasmine.SpyObj<DataStorageService>;

  beforeEach(async () => {
    const matDialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
    const dataStorageServiceSpyObj = jasmine.createSpyObj('DataStorageService', ['getPackageById']);

    await TestBed.configureTestingModule({
      declarations: [SelectPackagePopupComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpyObj },
        { provide: DataStorageService, useValue: dataStorageServiceSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPackagePopupComponent);
    component = fixture.componentInstance;
    matDialogRef = TestBed.inject(MatDialogRef) as MatDialogRef<SelectPackagePopupComponent>;
    dataStorageServiceSpy = TestBed.inject(DataStorageService) as jasmine.SpyObj<DataStorageService>;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when cancelled is true', () => {
    const cancelled = true;

    component.onClose(cancelled);

    expect(matDialogRef.close).toHaveBeenCalledOnceWith();
  });

  it('should close the dialog with SelectedPackaging when cancelled is false', fakeAsync(() => {
    const cancelled = false;
    const selectedPackaging: Packaging = {
      amountinstock: 10,
      id: '123',
      minAmount: 5,
      name: 'Groene doos',
      packagingGroup: 'Dozen',
      location: '12345',
    };
    const expectedSelectedPackaging = new SelectedPackaging(selectedPackaging, 1);

    dataStorageServiceSpy.getPackageById.and.returnValue(of(selectedPackaging));

    fixture = TestBed.createComponent(SelectPackagePopupComponent);
    component = fixture.componentInstance;
    matDialogRef = TestBed.inject(MatDialogRef) as MatDialogRef<SelectPackagePopupComponent>;

    component.onClose(cancelled);

    tick();

    expect(dataStorageServiceSpy.getPackageById).toHaveBeenCalledOnceWith(component.selectedOption);
    expect(matDialogRef.close).toHaveBeenCalledOnceWith(expectedSelectedPackaging);
  }));
});
