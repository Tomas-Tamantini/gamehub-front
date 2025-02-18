import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuComponent } from './account-menu.component';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMenuComponent],
      providers: [
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getPlayerId']) },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get player id from user service', () => {
    userServiceSpy.getPlayerId.and.returnValue("Alice");
    expect(component.playerId()).toBe("Alice");
  });

  it('should open login dialog on login', () => {
    component.login();
    expect(dialogSpy.open).toHaveBeenCalled();
  });
});
