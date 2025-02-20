import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket?: WebSocket;
  private callbackOnError?: (error: any) => void;
  private callbackOnMessage?: (message: any) => void;

  subcribeOnError(callback: (error: any) => void) {
    this.callbackOnError = callback;
  };

  subscribeOnMessage(callback: (message: object) => void) {
    this.callbackOnMessage = callback;
  }


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
      this.socket.onclose = () => {
        console.log("Disconnected from the websocket");
      };
      this.socket.onmessage = (event) => {
        this.handleMessage(event);
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
    if (this.callbackOnError) this.callbackOnError(error);
    else console.error("Websocket error", error);
  }

  private handleMessage(msgEvent: MessageEvent) {
    if (this.callbackOnMessage) this.callbackOnMessage(JSON.parse(msgEvent.data));
  }
}
