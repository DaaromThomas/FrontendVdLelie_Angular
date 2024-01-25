import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

import { NoPermissionsForThisComponent } from './no-permissions-for-this.component';

describe('NoPermissionsForThisComponent', () => {
  let component: NoPermissionsForThisComponent;
  let fixture: ComponentFixture<NoPermissionsForThisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoPermissionsForThisComponent],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NoPermissionsForThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
