import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavBarComponent } from "./nav-bar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [HttpClientModule, RouterLink],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'someValue' } } }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});