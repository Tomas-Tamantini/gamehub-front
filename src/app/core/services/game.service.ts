import { inject, Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socketService = inject(WebsocketService);

  makeMove(roomId: number, cards: Card[]) {
    this.socketService.send({
      requestType: "MAKE_MOVE",
      payload: { roomId, move: { cards } }
    });
  }
}
