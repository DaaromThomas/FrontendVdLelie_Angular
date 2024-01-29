import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogsComponent } from './logs.component';
import { LogService } from './log.service';
import { DataStorageService } from '../services/data-storage.service';
import { MatMenuModule } from '@angular/material/menu';

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;
  beforeEach(() => {
    const logServiceSpyObj = jasmine.createSpyObj('LogService', ['getLogs', 'logs', 'revertLog']);
    const dataStorageServiceSpyObj = jasmine.createSpyObj('DataStorageService', ['allInventoryData$']);

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
