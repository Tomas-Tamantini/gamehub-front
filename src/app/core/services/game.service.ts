import { inject, Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socketService = inject(WebsocketService);

  passTurn(roomId: number) {
    this.socketService.send({
      requestType: "MAKE_MOVE",
      payload: { roomId, move: { cards: [] } }
    });
  }

  playCards(roomId: number) {
    console.log("Implement playCards");
  }
}
