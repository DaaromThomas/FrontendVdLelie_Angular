import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPackagePopupComponent } from './add-package-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Packaging } from '../../interfaces/packaging';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddPackagePopupComponent', () => {
  let component: AddPackagePopupComponent;
  let fixture: ComponentFixture<AddPackagePopupComponent>;

  const matDialogRefStub = {
    close: (dialogResult: any) => { }
   };
   
   beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPackagePopupComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub }
      ]
    })
    .compileComponents();
   
    fixture = TestBed.createComponent(AddPackagePopupComponent);
    component = fixture.componentInstance;
   
    fixture.detectChanges();
   });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return true when checkAmount is runned and packaging is OK', () => {
    const packaging: Packaging = {
      amountinstock: 300,
      minAmount: 50,
      name: 'TestName',
      packagingGroup: 'TestGroup',
    }

    const result = component.checkAmount(packaging);

    expect(result).toBeTrue();
  });

  it('should return false when checkAmount is runned and packaging.amount is less then packaging.minAmount', () => {
    const packaging: Packaging = {
      amountinstock: 40,
      minAmount: 50,
      name: 'TestName',
      packagingGroup: 'TestGroup'
    }

    const result = component.checkAmount(packaging);

    expect(result).toBeFalse();
  });

  it('should return true when packaging is OK', () =>{
    const packaging: Packaging = {
      amountinstock: 300,
      minAmount: 50,
      name: 'TestName',
      packagingGroup: 'TestGroup'
    }

    const result = component.checkNewPackage(packaging);

    expect(result).toBeTrue();
  });

  it('should not emit events when done() is called with errors', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addPackage, 'emit');
    spyOn(component, 'savePackage');

    // Set form values to simulate an invalid form (e.g., missing required field)
    component.newPackage.setValue({
      amountinstock: 10,
      minAmount: 5,
      name: null,
      packagingGroup: 'TestGroup',
    });

    component.done();

    expect(component.popupClosed.emit).not.toHaveBeenCalled();
    expect(component.addPackage.emit).not.toHaveBeenCalled();
    expect(component.savePackage).not.toHaveBeenCalled();
    expect(component.amountErrorHidden).toBeTrue();
  });

  it('should emit events when done() is called without errors', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addPackage, 'emit');
    spyOn(component, 'savePackage');

    component.newPackage.setValue({
      amountinstock: 10,
      minAmount: 5,
      name: 'TestName',
      packagingGroup: 'TestGroup',
    });

    component.done();

    expect(component.popupClosed.emit).toHaveBeenCalled();
    expect(component.addPackage.emit).toHaveBeenCalled();
    expect(component.savePackage).toHaveBeenCalled();
    expect(component.amountErrorHidden).toBeFalse;
  });
});