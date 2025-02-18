import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuComponent } from './account-menu.component';
import { UserService } from '../../services/user.service';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMenuComponent],
      providers: [
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getPlayerId']) }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get player id from user service', () => {
    userServiceSpy.getPlayerId.and.returnValue("Alice");
    expect(component.playerId()).toBe("Alice");
  });
});
