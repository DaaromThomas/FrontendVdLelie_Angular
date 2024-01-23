import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateAccountPopupComponent } from './create-account-popup.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataStorageService } from '../../services/data-storage.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


describe('CreateAccountPopupComponent', () => {
  let component: CreateAccountPopupComponent;
  let fixture: ComponentFixture<CreateAccountPopupComponent>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<CreateAccountPopupComponent>>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [CreateAccountPopupComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSelectModule, FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: DataStorageService }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPopupComponent);
    component = fixture.componentInstance;
    matDialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CreateAccountPopupComponent>>;
    fixture.detectChanges();
  });

  it('should close the dialog and save when passwords match and fields are filled', () => {

    component.password = 'password';
    component.passcheck = 'password';
    component.employeenumber = 123;
    component.name = 'John Doe';
    component.email = 'john@example.com';

    component.closeDialog(true);


    expect(matDialogRefSpy.close).toHaveBeenCalled();
    expect(component.error).toEqual("");
  });

  it('should show an error when passwords do not match', () => {

    component.password = 'password1';
    component.passcheck = 'password2';

    component.closeDialog(true);

    expect(matDialogRefSpy.close).not.toHaveBeenCalled();
    expect(component.error).toEqual('passwords do not match');
  });

  it('should show an error when some fields are left empty', () => {
    component.password = 'password';
    component.passcheck = 'password';
    component.employeenumber = 0;
    component.name = '';
    component.email = '';

    component.closeDialog(true);

    expect(matDialogRefSpy.close).not.toHaveBeenCalled();
    expect(component.error).toEqual('some fields are left empty');
  });

  it('should close the dialog without saving when canceled', () => {
    component.closeDialog(false);

    expect(matDialogRefSpy.close).toHaveBeenCalled();
    expect(component.error).toEqual("");
  });
});
