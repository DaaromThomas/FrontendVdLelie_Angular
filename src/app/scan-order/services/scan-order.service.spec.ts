import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ScanOrderService } from './scan-order.service';

describe('ScanOrderService', () => {
  let service: ScanOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ScanOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});