import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket?: WebSocket;

  connect(playerId: string) {
    const socketUrl = environment.apiUrl + "/ws?player_id=" + playerId;
    this.socket = new WebSocket(socketUrl);
    this.socket.onopen = () => {
      console.log("Connected to the websocket");
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
