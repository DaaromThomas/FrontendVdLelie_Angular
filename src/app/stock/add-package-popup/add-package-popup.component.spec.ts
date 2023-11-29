import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPackagePopupComponent } from './add-package-popup.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Packaging } from '../../models/packaging.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AddPackagePopupComponent', () => {
  let component: AddPackagePopupComponent;
  let fixture: ComponentFixture<AddPackagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPackagePopupComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPackagePopupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return false when checkAmount is runned and packaging is OK', () => {
    const packaging: Packaging = new Packaging('TestGroup', 'TestID1', 300, 50, 'TestName', 'TestLocation');

    const result = component.checkAmount(packaging);

    expect(result).toBeFalse();
  });

  it('should return true when checkAmount is runned and packaging.amount is less then packaging.minAmount', () => {
    const packaging: Packaging = new Packaging('TestGroup', 'TestID1', 40, 50, 'TestName', 'TestLocation');

    const result = component.checkAmount(packaging);

    expect(result).toBeTrue();
  });

  it('should return true when packaging is OK', () =>{
    const packaging: Packaging = new Packaging('TestGroup', 'TestID1', 300, 50, 'TestName', 'TestLocation');

    const result = component.checkNewPackage(packaging);

    expect(result).toBeTrue();
  });

  it('should not emit events when done() is called with errors', () => {
    spyOn(component.popupClosed, 'emit');
    spyOn(component.addPackage, 'emit');
    spyOn(component, 'savePackage');

    // Set form values to simulate an invalid form (e.g., missing required field)
    component.newPackage.setValue({
      name: '',
      group: 'TestGroup',
      amount: '10',
      minAmount: '5',
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

    // Set form values to simulate an invalid form (e.g., missing required field)
    component.newPackage.setValue({
      name: 'TestName',
      group: 'TestGroup',
      amount: '10',
      minAmount: '5',
    });

    component.done();

    expect(component.popupClosed.emit).toHaveBeenCalled();
    expect(component.addPackage.emit).toHaveBeenCalled();
    expect(component.savePackage).toHaveBeenCalled();
    expect(component.amountErrorHidden).toBeFalse;
  });
});
