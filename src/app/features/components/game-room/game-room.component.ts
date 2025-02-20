import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorPayload, GameState, Message } from '../../../core/models/message.model';
import { RoomSummary } from '../../../core/models/room-summary.model';

@Component({
  selector: 'app-game-room',
  imports: [],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.scss'
})
export class GameRoomComponent implements OnInit, OnDestroy {
  private socketService = inject(WebsocketService)
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.socketService.connect(this.authService.getPlayerId());
    this.socketService.subcribeOnError(() => {
      this.alertService.alertError("Could not connect to server");
    });
    this.socketService.subscribeOnMessage(msg => this.handleMessage(msg as Message));
    this.sendInitialRequest();
  }

  private sendInitialRequest() {
    const roomId = this.route.snapshot.paramMap.get('id');
    const action = this.route.snapshot.queryParamMap.get('action');
    const requestTypeMap = {
      join: "JOIN_GAME_BY_ID",
      rejoin: "REJOIN_GAME"
    }
    if (!action || !(action in requestTypeMap)) {
      this.alertService.alertError(`Invalid action: ${action}`);
    }
    else {
      const requestType = requestTypeMap[action as keyof typeof requestTypeMap];
      this.socketService.send({ requestType, payload: { roomId } });
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  handleMessage(msg: Message) {
    switch (msg.messageType) {
      case "ERROR":
        this.handleErrorMessage(msg.payload);
        break;
      case "GAME_ROOM_UPDATE":
        this.handleGameRoomUpdateMessage(msg.payload);
        break;
      case "GAME_STATE":
        this.handleGameStateMessage(msg.payload);
        break;
    }
  }

  private handleErrorMessage(msgPayload: ErrorPayload) {
    this.alertService.alertError(msgPayload.error);
  }

  private handleGameRoomUpdateMessage(msgPayload: RoomSummary) {
    console.log(msgPayload);
  }

  private handleGameStateMessage(msgPayload: GameState) {
    console.log(msgPayload);
  }
}
