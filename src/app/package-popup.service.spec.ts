import { TestBed } from '@angular/core/testing';

import { PackagePopupService } from './package-popup.service';

describe('PackagePopupService', () => {
  let service: PackagePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
