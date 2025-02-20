import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket?: WebSocket;

  connect() {
    const socketUrl = environment.apiUrl + "/ws";
    this.socket = new WebSocket(socketUrl);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
