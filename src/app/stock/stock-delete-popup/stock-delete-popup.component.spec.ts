import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDeletePopupComponent } from './stock-delete-popup.component';

describe('StockDeletePopupComponent', () => {
  let component: StockDeletePopupComponent;
  let fixture: ComponentFixture<StockDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockDeletePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
