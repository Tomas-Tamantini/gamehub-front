import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomComponent } from './game-room.component';
import { WebsocketService } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { RoomSummary } from '../../../core/models/room-summary.model';
import { GameState } from '../../../core/models/message.model';

describe('GameRoomComponent', () => {
  let component: GameRoomComponent;
  let fixture: ComponentFixture<GameRoomComponent>;
  let socketServiceSpy: jasmine.SpyObj<WebsocketService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: { get: () => "123" },
        queryParamMap: { get: jasmine.createSpy('get') }
      }
    }

    await TestBed.configureTestingModule({
      imports: [GameRoomComponent],
      providers: [
        {
          provide: WebsocketService, useValue: jasmine.createSpyObj('WebsocketService',
            [
              'send',
              'connect',
              'disconnect',
              'subcribeOnError',
              'subscribeOnMessage'
            ]
          )
        },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getPlayerId']) },
        { provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['alertError']) },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
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

  describe('initial request', () => {
    it('should send join game request', () => {
      mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue('join');
      component.ngOnInit();
      expect(socketServiceSpy.send).toHaveBeenCalledWith({
        requestType: 'JOIN_GAME_BY_ID',
        payload: Object({ roomId: '123' })
      });
    });

    it('should send rejoin game request', () => {
      mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue('rejoin');
      component.ngOnInit();
      expect(socketServiceSpy.send).toHaveBeenCalledWith({
        requestType: 'REJOIN_GAME',
        payload: Object({ roomId: '123' })
      });
    });

    it('should alert on invalid action', () => {
      mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue('play');
      component.ngOnInit();
      expect(alertServiceSpy.alertError).toHaveBeenCalledWith("Invalid action: play");
    });
  });

  describe('computed state', () => {
    it('should not be in lobby if roomSummary is null', () => {
      expect(component.isInLobby()).toBeFalsy();
    });

    it('should not be in lobby if room is full', () => {
      component.roomSummary.set({ isFull: true } as RoomSummary);
      expect(component.isInLobby()).toBeFalse();
    });

    it('should be in lobby if room is not full', () => {
      component.roomSummary.set({ isFull: false } as RoomSummary);
      expect(component.isInLobby()).toBeTrue();
    });

    it('should start game when room is full', () => {
      expect(component.gameHasStarted()).toBeFalse();
      component.roomSummary.set({ isFull: true } as RoomSummary);
      expect(component.gameHasStarted()).toBeTrue();
    });
  });

  describe('message handling', () => {
    beforeEach(() => {
      alertServiceSpy.alertError.calls.reset();
    });

    it('should update room summary on GAME_ROOM_UPDATE message', () => {
      const mockSummary = { roomId: 123 } as RoomSummary;
      component.handleMessage({ messageType: "GAME_ROOM_UPDATE", payload: mockSummary });
      expect(component.roomSummary()).toEqual(mockSummary);
    });

    it('should update game state on GAME_STATE message', () => {
      const mockState = { roomId: 123 } as GameState;
      component.handleMessage({ messageType: "GAME_STATE", payload: mockState });
      expect(component.gameState()).toEqual(mockState);
    });

    it('should alert on error message', () => {
      component.handleMessage({ messageType: "ERROR", payload: { error: 'error message' } });
      expect(alertServiceSpy.alertError).toHaveBeenCalledWith("error message");
    });

    it('should rejoin game if error message is "Player already in room"', () => {
      component.handleMessage({ messageType: "ERROR", payload: { error: 'Player already in room' } });
      expect(alertServiceSpy.alertError).not.toHaveBeenCalled();
      expect(socketServiceSpy.send).toHaveBeenCalledWith({
        requestType: 'REJOIN_GAME',
        payload: Object({ roomId: '123' })
      });
    });
  });
});
