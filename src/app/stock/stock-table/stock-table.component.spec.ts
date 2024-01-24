import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockTableComponent } from './stock-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Packaging } from '../../interfaces/packaging';

describe('StockTableComponent', () => {
  let component: StockTableComponent;
  let fixture: ComponentFixture<StockTableComponent>;

  const mockData: Packaging[]  = [
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockTableComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    });

    fixture = TestBed.createComponent(StockTableComponent);
    component = fixture.componentInstance;
    component.data = mockData; // Provide mock data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});