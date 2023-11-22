import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderScreenComponentComponent } from './order-screen-component.component';

describe('OrderScreenComponentComponent', () => {
  let component: OrderScreenComponentComponent;
  let fixture: ComponentFixture<OrderScreenComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderScreenComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderScreenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
