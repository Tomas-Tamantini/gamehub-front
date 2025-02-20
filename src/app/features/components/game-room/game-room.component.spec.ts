import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomComponent } from './game-room.component';
import { WebsocketService } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

describe('GameRoomComponent', () => {
  let component: GameRoomComponent;
  let fixture: ComponentFixture<GameRoomComponent>;
  let socketServiceSpy: jasmine.SpyObj<WebsocketService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRoomComponent],
      providers: [
        {
          provide: WebsocketService, useValue: jasmine.createSpyObj('WebsocketService',
            [
              'connect',
              'disconnect',
              'subcribeOnError'
            ]
          )
        },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getPlayerId']) },
        { provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['alertError']) }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameRoomComponent);
    socketServiceSpy = TestBed.inject(WebsocketService) as jasmine.SpyObj<WebsocketService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    alertServiceSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    authServiceSpy.getPlayerId.and.returnValue("Alice");
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect the websocket service on init', () => {
    expect(socketServiceSpy.connect).toHaveBeenCalledWith("Alice");
  })

  it('should disconnect the websocket service on destroy', () => {
    component.ngOnDestroy();
    expect(socketServiceSpy.disconnect).toHaveBeenCalled();
  });

  it('should subscribe to socket error events', () => {
    expect(socketServiceSpy.subcribeOnError).toHaveBeenCalled();
  });

  it('should alert socket errors', () => {
    const error = new Event("error");
    socketServiceSpy.subcribeOnError.calls.mostRecent().args[0](error);
    expect(alertServiceSpy.alertError).toHaveBeenCalledWith("Could not connect to server");
  })
});
