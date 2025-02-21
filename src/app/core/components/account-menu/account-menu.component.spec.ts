import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuComponent } from './account-menu.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMenuComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getPlayerId', 'login', 'logout']) },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountMenuComponent);
    const router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get player id from auth service', () => {
    authServiceSpy.getPlayerId.and.returnValue("Alice");
    expect(component.playerId()).toBe("Alice");
  });

  describe('logout', () => {
    beforeEach(() => { component.logout(); });

    it('should logout user', () => {
      expect(authServiceSpy.logout).toHaveBeenCalled();
    });

    it('should redirect to login page', () => {
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('login', () => {
    it('should redirect to login page', () => {
      component.login();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});
