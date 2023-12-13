import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [LoginService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change input type to "text" when showPassword is false', () => {
    component.showPassword = false;
    component.passwordInput.nativeElement.type = 'password';

    component.togglePasswordVisibility();

    expect(component.passwordInput.nativeElement.type).toBe('text');
  });

  it('should change input type to "password" when showPassword is true', () => {
    component.showPassword = true;
    component.passwordInput.nativeElement.type = 'text';

    component.togglePasswordVisibility();

    expect(component.passwordInput.nativeElement.type).toBe('password');
  });

  it('should have showPassword set to false initially', () => {
    expect(component.showPassword).toBe(false);
  });

  it('should have passwordInput defined initially', () => {
    expect(component.passwordInput).toBeDefined();
  });

  it('should have passwordInput.nativeElement.type defined initially', () => {
    expect(component.passwordInput.nativeElement.type).toBeDefined();
  });

  it('should call loginService.loginRequest with the value of login form as argument', () => {
    const loginValue = { username: 'test', password: 'password' };
    spyOn(component['loginService'], 'loginRequest');
    component.login.setValue(loginValue);
    component.onClick();
    expect(component['loginService'].loginRequest).toHaveBeenCalledWith(
      loginValue
    );
  });
  it('should unsubscribe from the subscription when ngOnDestroy is called', () => {
    component.subscription = { unsubscribe: jasmine.createSpy('unsubscribe') };

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should not throw an error if subscription is undefined', () => {

    expect(() => {
      component.ngOnDestroy();
    }).not.toThrow();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
