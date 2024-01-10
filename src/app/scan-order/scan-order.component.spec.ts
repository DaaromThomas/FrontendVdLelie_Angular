import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanOrderComponent } from './scan-order.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {ScanOrderService} from "./services/scan-order.service";


describe('ScanOrderComponent', () => {
  let component: ScanOrderComponent;
  let service: ScanOrderService;
  let fixture: ComponentFixture<ScanOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScanOrderComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
    })
      .compileComponents();

    service = TestBed.inject(ScanOrderService);
    fixture = TestBed.createComponent(ScanOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error when scanned order is not a number', ()=>{
    component.InputProductNumber="e";
    component.getOrders();
    expect(component.errorMessage=="must be a valid product number").toBeTruthy();
  });

  it('should show an error when not scanning anything', ()=>{
    component.InputProductNumber="";
    component.getOrders();
    expect(component.errorMessage=="please scan a product").toBeTruthy();
  });


});
