import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ScanOrderComponent } from './scan-order.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { SelectPackagePopupComponent } from './select-package-popup/select-package-popup.component';
import { of } from 'rxjs';

describe('ScanOrderComponent', () => {
  let component: ScanOrderComponent;
  let fixture: ComponentFixture<ScanOrderComponent>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const matDialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ScanOrderComponent],
      imports: [HttpClientModule,],
      providers: [
        { provide: MatDialog, useValue: matDialogSpyObj }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScanOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when openDialog is called', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(matDialogSpy.open).toHaveBeenCalledOnceWith(
      SelectPackagePopupComponent,
      jasmine.objectContaining({ width: '750px' })
    );
  });

  it('should emit the correct result when the dialog is closed', fakeAsync(() => {
    const expectedDialogResult = 'your expected result';
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(expectedDialogResult) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    tick();

    expect(matDialogSpy.open).toHaveBeenCalledOnceWith(
      SelectPackagePopupComponent,
      jasmine.objectContaining({ width: '750px' })
    );

    dialogRefSpyObj.afterClosed().subscribe((result: any) => {
      expect(result).toEqual(expectedDialogResult);
    });
  }));

});
