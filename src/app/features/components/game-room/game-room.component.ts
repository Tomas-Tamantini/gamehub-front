import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute } from '@angular/router';

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
    this.socketService.subscribeOnMessage(msg => console.log(msg));
    const roomId = this.route.snapshot.paramMap.get('id');
    const action = this.route.snapshot.queryParamMap.get('action');
    if (action == 'join') {
      this.socketService.send({
        requestType: "JOIN_GAME_BY_ID",
        payload: { roomId }
      });
    }
    else if (action == 'rejoin') {
      this.socketService.send({
        requestType: "REJOIN_GAME",
        payload: { roomId }
      });
    }
    else {
      this.alertService.alertError(`Invalid action: ${action}`);
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
