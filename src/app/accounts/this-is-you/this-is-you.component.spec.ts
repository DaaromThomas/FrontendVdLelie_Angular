import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { ThisIsYouComponent } from './this-is-you.component';

describe('ThisIsYouComponent', () => {
  let component: ThisIsYouComponent;
  let fixture: ComponentFixture<ThisIsYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThisIsYouComponent],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ThisIsYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
