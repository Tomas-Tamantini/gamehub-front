import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomCardComponent } from './room-card.component';
import { ComponentRef } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let componentRef: ComponentRef<RoomCardComponent>;
  let fixture: ComponentFixture<RoomCardComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const makeRoom = (isFull: boolean) => ({
    roomId: 123,
    playerIds: ["Alice", "Bob", "Charlie", "Diana"],
    offlinePlayers: ["Alice", "Bob"],
    configuration: { gameOverPointThreshold: 15 },
    isFull
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCardComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getPlayerId']) }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomCardComponent);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('room', makeRoom(false));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to rejoin if they are listed among offline players', () => {
    authServiceSpy.getPlayerId.and.returnValue("Bob");
    fixture.detectChanges();
    expect(component.canRejoin()).toBeTrue();
  })

  it('should not allow user to rejoin if they are not listed among offline players', () => {
    authServiceSpy.getPlayerId.and.returnValue("Charlie");
    fixture.detectChanges();
    expect(component.canRejoin()).toBeFalse();
  })

  it('should allow user to join if room is not full', () => {
    fixture.detectChanges();
    expect(component.canJoin()).toBeTrue();
  })

  it('should not allow user to join if room is full', () => {
    componentRef.setInput('room', makeRoom(true));
    fixture.detectChanges();
    expect(component.canJoin()).toBeFalse();
  });

  describe('enter room', () => {
    it('should redirect to game page', () => {
      component.enterRoom('join');
      const expectedRoute = ['/room', 123];
      expect(navigateSpy).toHaveBeenCalledWith(expectedRoute, jasmine.any(Object));
    });

    it('should redirect with proper action', () => {
      ['join', 'watch', 'rejoin'].forEach(action => {
        component.enterRoom(action as 'join' | 'watch' | 'rejoin');
        const expectedParams = { queryParams: { action } };
        expect(navigateSpy).toHaveBeenCalledWith(jasmine.any(Array), expectedParams);
      });
    });
  })
});
