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

  const mockData: Packaging[] = [
    {
      id: '1',
      packagingGroup: 'Group 1',
      name: 'Packaging 1',
      location: 'Location 1',
      amountinstock: 10,
      minAmount: 5,
    },
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
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the table when the data input changes', () => {
    const updatedData: Packaging[] = [
      {
        id: '2',
        packagingGroup: 'Group 2',
        name: 'Packaging 2',
        location: 'Location 2',
        amountinstock: 20,
        minAmount: 10,
      },
      {
        id: '3',
        packagingGroup: 'Group 3',
        name: 'Packaging 3',
        location: 'Location 3',
        amountinstock: 30,
        minAmount: 15,
      },
    ];

    component.data = updatedData;
    component.ngOnChanges();

    expect(component.dataSource.data.length).toBe(2);
    console.log(component.dataSource.data[0])
    expect(component.dataSource.data[0].value).toEqual({
      id: '2',
      group: 'Group 2',
      name: 'Packaging 2',
      location: 'Location 2',
      amountInStock: 20,
      minAmount: 10,
      isEditable: true,
      isNewRow: false,
    });
    expect(component.dataSource.data[1].value).toEqual({
      id: '3',
      group: 'Group 3',
      name: 'Packaging 3',
      location: 'Location 3',
      amountInStock: 30,
      minAmount: 15,
      isEditable: true,
      isNewRow: false,
    });
  });
  it('should allow the user to edit the data in the table', () => {
  
    const data = [
      {
        id: '1',
        packagingGroup: 'Group 1',
        name: 'Packaging 1',
        location: 'Location 1',
        amountinstock: 10,
        minAmount: 5,
      },
    ];
    component.data = data;
    component.ngOnChanges();

    component.EditSVO(component.VOForm, 0);

    expect(component.getIsEditable(0)).toBe(false);
  });
  it('should handle gracefully when the data input is empty', () => {
    const data: any[] = [];
    component.data = data;
    component.ngOnChanges();
    expect(component.dataSource.data.length).toBe(0);
  });
});
