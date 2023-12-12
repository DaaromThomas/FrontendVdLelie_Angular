import { TestBed } from '@angular/core/testing';

import { ScanOrderService } from './scan-order.service';

describe('ScanOrderService', () => {
  let service: ScanOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanOrderService);
  });
});
