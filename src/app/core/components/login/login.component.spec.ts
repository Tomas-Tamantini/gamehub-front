import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login']) },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    const router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow user to login if player id is empty', () => {
    component.playerId.set(" ");
    expect(component.canSubmit()).toBeFalse();
  });

  it('should allow user to login if player id is not empty', () => {
    component.playerId.set("Alice");
    expect(component.canSubmit()).toBeTrue();
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.playerId.set(" Alice ");
      component.onSubmit();
    });


    it('should trim playerId before submitting', () => {
      expect(authServiceSpy.login).toHaveBeenCalledWith("Alice");
    });

    it('should redirect to home page after successful login', () => {
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });
});
