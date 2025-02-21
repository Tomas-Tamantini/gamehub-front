import { Component, computed, input } from '@angular/core';
import { GameState } from '../../../../core/models/message.model';
import { RoomSummary } from '../../../../core/models/room-summary.model';
import { Player } from './player/player.model';
import { PlayerComponent } from "./player/player.component";

@Component({
  selector: 'app-game',
  imports: [PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  gameState = input.required<GameState>();
  roomInfo = input.required<RoomSummary>();

  players = computed<Player[]>(() => {
    return this.roomInfo().playerIds.map(playerId => {
      return { playerId }
    });
  });
}
