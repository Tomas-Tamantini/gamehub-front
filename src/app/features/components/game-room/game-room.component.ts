import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { WebsocketService } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../core/models/message.model';
import { RoomSummary } from '../../../core/models/room-summary.model';
import { LobbyComponent } from "./lobby/lobby.component";
import { GameComponent } from "./game/game.component";
import { SharedGameState } from '../../../core/models/shared-view.model';
import { PrivateView } from '../../../core/models/private-view.model';
import { GameStatus } from '../../../core/models/game-status.model';

@Component({
  selector: 'app-game-room',
  imports: [LobbyComponent, GameComponent],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.scss'
})
export class GameRoomComponent implements OnInit, OnDestroy {
  private socketService = inject(WebsocketService)
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private route = inject(ActivatedRoute);

  roomSummary = signal<RoomSummary | null>(null);
  sharedGameState = signal<SharedGameState | null>(null);
  privateGameState = signal<PrivateView | null>(null);

  public gameHasStarted = computed(() => {
    return !!(this.roomSummary()?.isFull && this.sharedGameState())
  });

  public isInLobby = computed(() => {
    return !!this.roomSummary() && !this.gameHasStarted();
  });

  private roomId() {
    return this.route.snapshot.paramMap.get('id');
  }

  private action() {
    return this.route.snapshot.queryParamMap.get('action');
  }

  ngOnInit() {
    this.socketService.connect(this.authService.getPlayerId());
    this.socketService.subcribeOnError(() => {
      this.alertService.alertError("Could not connect to server");
    });
    this.socketService.subscribeOnMessage(msg => this.handleMessage(msg as Message));
    this.sendInitialRequest(this.action());
  }

  private sendInitialRequest(action: string | null) {
    const requestTypeMap = {
      join: "JOIN_GAME_BY_ID",
      rejoin: "REJOIN_GAME"
    }
    if (!action || !(action in requestTypeMap)) {
      this.alertService.alertError(`Invalid action: ${action}`);
    }
    else {
      const requestType = requestTypeMap[action as keyof typeof requestTypeMap];
      this.socketService.send({ requestType, payload: { roomId: this.roomId() } });
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  handleMessage(msg: Message) {
    switch (msg.messageType) {
      case "ERROR":
        if (msg.payload.error === "Player already in room") {
          this.sendInitialRequest("rejoin");
        }
        else {
          this.alertService.alertError(msg.payload.error);
        }
        break;
      case "GAME_ROOM_UPDATE":
        this.roomSummary.set(msg.payload);
        break;
      case "GAME_STATE":
        if (msg.payload.sharedView) {
          this.sharedGameState.set(msg.payload.sharedView);
          if (msg.payload.sharedView.status === GameStatus.END_GAME) {
            this.alertService.alertWarning("Game over!");
          }
        }
        if (msg.payload.privateView) {
          this.privateGameState.set(msg.payload.privateView);
        }
        break;
    }
  }
}
