import { Component, input } from '@angular/core';
import { GameState } from '../../../../core/models/message.model';
import { RoomSummary } from '../../../../core/models/room-summary.model';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  gameState = input.required<GameState>();
  roomInfo = input.required<RoomSummary>();
}
