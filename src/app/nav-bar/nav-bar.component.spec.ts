import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavBarComponent } from "./nav-bar.component";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CookieService } from "../login/cookie.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let cookieService: CookieService;
  let fixture: ComponentFixture<NavBarComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [HttpClientTestingModule, RouterLink],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'someValue' } } }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarComponent);
    cookieService = TestBed.inject(CookieService);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getCookie method of cookieService to retrieve refreshToken', () => {
    spyOn(cookieService, 'getCookie').and.returnValue('refreshToken');
    component.onLogoutCLick();
    expect(cookieService.getCookie).toHaveBeenCalledWith('refreshToken');
  });
  it('should send DELETE request to http://localhost:8080/refreshtoken with refreshToken as query parameter', () => {
    spyOn(cookieService, 'getCookie').and.returnValue('refreshToken');

    component.onLogoutCLick();

    const req = httpMock.expectOne({
      method: 'DELETE',
      url: 'http://localhost:8080/refreshtoken?refreshToken=refreshToken'
    });

    expect(req.request.method).toEqual('DELETE');
    expect(req.request.params.get('refreshToken')).toEqual('refreshToken');
    req.flush({});
  
  });

  it("should navigate to '/login' route using router service", () => {
    spyOn(cookieService, "getCookie").and.returnValue("refreshToken");
    spyOn(Router.prototype, "navigateByUrl");
    component.onLogoutCLick();
    expect(Router.prototype.navigateByUrl).toHaveBeenCalledWith("/login");
  });
});
