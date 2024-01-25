import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LogService } from './log.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogService', () => {
  let service: LogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    service = TestBed.inject(LogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
