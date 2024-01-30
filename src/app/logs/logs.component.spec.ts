import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogsComponent } from './logs.component';
import { LogService } from './log.service';
import { DataStorageService } from '../services/data-storage.service';
import { MatMenuModule } from '@angular/material/menu';
import { Log } from '../models/Log';
import { Packaging } from '../interfaces/packaging';

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;

  beforeEach(() => {
    const logServiceSpyObj = jasmine.createSpyObj('LogService', ['getLogs', 'logs', 'revertLog']);

    const dataStorageServiceSpyObj = jasmine.createSpyObj('DataStorageService', ['allInventoryData$']);
    dataStorageServiceSpyObj.allInventoryData$.and.returnValue({ packageList: [] });

    TestBed.configureTestingModule({
      declarations: [LogsComponent],
      imports: [MatTableModule, MatPaginatorModule, FormsModule, BrowserAnimationsModule, MatMenuModule],
      providers: [
        { provide: LogService, useValue: logServiceSpyObj },
        { provide: DataStorageService, useValue: dataStorageServiceSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give all possible logs when no filters are filled in', () => {
    const expectedNumberOfLogs: number = component.logs.length;

    component.nameFilter = '';
    component.productFilter = '';
    component.filterDate = null;
    component.beginTime = null;
    component.endTime = null;

    component.applyFilters();

    const actualNumberOfLogs: number = component.filteredLogs.data.length;

    expect(actualNumberOfLogs).toEqual(expectedNumberOfLogs);
  });

  it('should convert timeArray correctly to string', () => {
    const numberArray: number[] = [13, 40];
    const expected: string = '13:40';

    const actual: string = component.convertTimeToShowableString(numberArray);

    expect(expected).toEqual(actual);
  });

  it('should convert logDate correctly to string', () => {
    const numberArray: number[] = [2024, 1, 28];
    const expected: string = '2024 - 01 - 28';

    const actual: string = component.convertDateToShowableString(numberArray);

    expect(expected).toEqual(actual);
  });

  it('should reset filter correctly', () => {
    component.nameFilter = 'name';
    component.productFilter = 'product';
    component.filterDate = null;
    component.beginTime = null;
    component.endTime = null;

    component.applyFilters();

    expect(component.nameFilter).toEqual('');
    expect(component.productFilter).toEqual('');
    expect(component.filterDate).toEqual(null);
    expect(component.beginTime).toEqual(null);
    expect(component.endTime).toEqual(null);
  });
});
