import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuComponent } from './account-menu.component';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMenuComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getPlayerId', 'login', 'logout']) },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get player id from auth service', () => {
    authServiceSpy.getPlayerId.and.returnValue("Alice");
    expect(component.playerId()).toBe("Alice");
  });

  it('should logout user on logout', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  describe('login', () => {
    beforeEach(() => {
      dialogSpy.open.and.returnValue(
        {
          afterClosed: () => of('Alice')
        } as MatDialogRef<LoginDialogComponent>);
      component.login();
    });

    it('should open login dialog', () => {
      expect(dialogSpy.open).toHaveBeenCalled();
    });

    it('should login user after dialog close', () => {
      expect(authServiceSpy.login).toHaveBeenCalledWith("Alice");
    });
  });
});
