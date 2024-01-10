import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingcomponentComponent } from './loadingcomponent.component';

describe('LoadingcomponentComponent', () => {
  let component: LoadingcomponentComponent;
  let fixture: ComponentFixture<LoadingcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
