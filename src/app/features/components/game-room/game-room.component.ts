import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-game-room',
  imports: [],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.scss'
})
export class GameRoomComponent implements OnInit, OnDestroy {
  private socketService = inject(WebsocketService)
  private authService = inject(AuthService);

  ngOnInit() {
    this.socketService.connect(this.authService.getPlayerId());
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
