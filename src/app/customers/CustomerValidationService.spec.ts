import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerValidationService } from './CustomerValidationService';
describe('CustomerValidationService', () => {
  let service: CustomerValidationService;

  beforeEach(() => {
    service = new CustomerValidationService();
  })

  it('should create a form', () => {
    const customer = {
      name: 'John Doe',
      address: '123 Main St',
      phonenumber: '1234567890',
      email: 'john.doe@example.com'
    };
   
    const form = service.createForm(customer);
   
    expect(form.value).toEqual(customer);
   });
   

});
