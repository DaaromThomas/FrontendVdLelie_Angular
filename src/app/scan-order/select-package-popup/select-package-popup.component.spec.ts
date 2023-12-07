import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPackagePopupComponent } from './select-package-popup.component';

describe('SelectPackagePopupComponent', () => {
  let component: SelectPackagePopupComponent;
  let fixture: ComponentFixture<SelectPackagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectPackagePopupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectPackagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
