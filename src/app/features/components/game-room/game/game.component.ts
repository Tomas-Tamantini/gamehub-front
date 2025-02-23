import { Component, computed, inject, input } from '@angular/core';
import { GameState } from '../../../../core/models/message.model';
import { RoomSummary } from '../../../../core/models/room-summary.model';
import { Player } from './player/player.model';
import { PlayerComponent } from "./player/player.component";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-game',
  imports: [PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  gameState = input.required<GameState>();
  roomInfo = input.required<RoomSummary>();
  authService = inject(AuthService);

  private static playerAngle(offset: number, numPlayers: number): number {
    const angle = 90 * (7 * numPlayers - 4 * offset) / numPlayers
    return Math.floor(angle) % 360;
  }

  players = computed<Player[]>(() => {
    const numPlayers = this.roomInfo().playerIds.length;
    const currentPlayerIdx = this.authService.getPlayerId() ? this.roomInfo().playerIds.indexOf(this.authService.getPlayerId()) : 0;
    return this.roomInfo().playerIds.map((playerId, index) => {
      const offset = (index - currentPlayerIdx + 4) % 4;
      const angleAroundTableDegrees = GameComponent.playerAngle(offset, numPlayers);
      return { playerId, angleAroundTableDegrees }
    });
  });
}
