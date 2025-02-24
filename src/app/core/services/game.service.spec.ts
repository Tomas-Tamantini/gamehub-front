import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { WebsocketService } from './websocket.service';

describe('GameService', () => {
  let service: GameService;
  let socketServiceSpy: jasmine.SpyObj<WebsocketService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WebsocketService, useValue: jasmine.createSpyObj('WebsocketService', ['send'])
        }
      ]
    });
    socketServiceSpy = TestBed.inject(WebsocketService) as jasmine.SpyObj<WebsocketService>;
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send pass turn request', () => {
    service.passTurn(123);
    expect(socketServiceSpy.send).toHaveBeenCalledWith({ requestType: "MAKE_MOVE", payload: { roomId: 123, move: { cards: [] } } });
  });
});
