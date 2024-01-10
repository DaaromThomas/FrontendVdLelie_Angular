import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DeleteCustomerComponent } from './delete-customer.component';
import { DataStorageService } from '../../services/data-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

class MockDataStorageService {
 deleteCustomer(id: string) { return of(null); }
 getCustomers() { return of([]); }
 hasUnpackedOrders(id: string) { return of(false); }
}

class MockMatDialogRef {
 close() {}
}

describe('DeleteCustomerComponent', () => {
 let component: DeleteCustomerComponent;
 let fixture: ComponentFixture<DeleteCustomerComponent>;

 beforeEach(waitForAsync(() => {
  TestBed.configureTestingModule({
    declarations: [ DeleteCustomerComponent ],
    imports: [ReactiveFormsModule],
    providers: [
      { provide: MatDialogRef, useClass: MockMatDialogRef },
      { provide: MAT_DIALOG_DATA, useValue: { customer: {} } },
      { provide: DataStorageService, useClass: MockDataStorageService }
    ]
  })
  .compileComponents();
 }));

 beforeEach(() => {
  fixture = TestBed.createComponent(DeleteCustomerComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
 });

 it('should call deleteCustomer when onDelete is called', async () => {
 component.customer = { 
   id: '1', 
   number: 1, 
   name: 'John Doe', 
   address: '123 Main St', 
   phonenumber: '123-456-7890', 
   email: 'john.doe@example.com' 
 };

 spyOn(component, 'safeToDelete').and.returnValue(Promise.resolve(true));
 
 const spy = spyOn(component['dataStorageService'], 'deleteCustomer').and.callThrough();
 
 await component.onDelete();
 
 expect(spy).toHaveBeenCalled();
 });

 it('should not call deleteCustomer when onDelete is called and safeToDelete returns false', async () => {
 component.customer = { 
  id: '1', 
  number: 1, 
  name: 'John Doe', 
  address: '123 Main St', 
  phonenumber: '123-456-7890', 
  email: 'john.doe@example.com' 
 };

 spyOn(component, 'safeToDelete').and.returnValue(Promise.resolve(false));
 
 const spy = spyOn(component['dataStorageService'], 'deleteCustomer');
 
 await component.onDelete();
 
 expect(spy).not.toHaveBeenCalled();
 });
 
});
