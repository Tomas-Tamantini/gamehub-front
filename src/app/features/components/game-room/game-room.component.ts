import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { WebsocketService } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../core/models/message.model';
import { RoomSummary } from '../../../core/models/room-summary.model';
import { LobbyComponent } from "./lobby/lobby.component";

@Component({
  selector: 'app-game-room',
  imports: [LobbyComponent],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.scss'
})
export class GameRoomComponent implements OnInit, OnDestroy {
  private socketService = inject(WebsocketService)
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private route = inject(ActivatedRoute);

  roomSummary = signal<RoomSummary | null>(null);

  public gameHasStarted = computed(() => {
    return this.roomSummary()?.isFull ?? false;
  });

  public isInLobby = computed(() => {
    return this.roomSummary() && !this.gameHasStarted();
  });

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
        this.alertService.alertError(msg.payload.error);
        break;
      case "GAME_ROOM_UPDATE":
        this.roomSummary.set(msg.payload);
        break;
      case "GAME_STATE":
        console.log(msg.payload);
        break;
    }
  }
}
