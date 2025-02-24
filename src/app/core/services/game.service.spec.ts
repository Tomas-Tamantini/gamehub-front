import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { WebsocketService } from './websocket.service';
import { Card } from '../models/card.model';

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

  it('should send make move request', () => {
    const roomId = 123;
    const cards: Card[] = [{ rank: 'A', suit: 'h' }];
    service.makeMove(roomId, cards);
    expect(socketServiceSpy.send).toHaveBeenCalledWith({ requestType: "MAKE_MOVE", payload: { roomId, move: { cards } } });
  });
});
