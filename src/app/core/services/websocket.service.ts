import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket?: WebSocket;
  private callbackOnError?: (error: any) => void;

  subcribeOnError(callback: (error: any) => void) {
    this.callbackOnError = callback;
  };

  connect(playerId: string) {
    const socketUrl = environment.apiUrl + "/ws?player_id=" + playerId;
    try {
      this.socket = new WebSocket(socketUrl);
      this.socket.onopen = () => {
        console.log("Connected to the websocket");
      };
      this.socket.onerror = (error) => {
        this.handleError(error);
      };
    }
    catch (error) {
      this.handleError(error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  private handleError(error: any) {
    if (this.callbackOnError) {
      this.callbackOnError(error);
    }
    else {
      console.error("Websocket error", error);
    }
  }
}
