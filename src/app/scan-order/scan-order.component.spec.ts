import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanOrderComponent } from './scan-order.component';
import { HttpClientModule } from '@angular/common/http';

describe('ScanOrderComponent', () => {
  let component: ScanOrderComponent;
  let fixture: ComponentFixture<ScanOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScanOrderComponent],
      imports: [HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
