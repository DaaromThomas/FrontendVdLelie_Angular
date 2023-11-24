import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackagePopupComponent } from './add-package-popup.component';

describe('AddPackagePopupComponent', () => {
  let component: AddPackagePopupComponent;
  let fixture: ComponentFixture<AddPackagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPackagePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPackagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
