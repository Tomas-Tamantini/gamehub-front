import { Component, computed, inject, input } from '@angular/core';
import { RoomSummary } from '../../../../core/models/room-summary.model';
import { Player } from './player/player.model';
import { PlayerComponent } from "./player/player.component";
import { AuthService } from '../../../../core/services/auth.service';
import { SharedGameState } from '../../../../core/models/shared-view.model';
import { PrivateView } from '../../../../core/models/private-view.model';
import { MatButtonModule } from '@angular/material/button';
import { GameService } from '../../../../core/services/game.service';
import { CardsService } from '../../../../core/services/cards.service';

@Component({
  selector: 'app-game',
  imports: [PlayerComponent, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  sharedGameState = input.required<SharedGameState>();
  privateGameState = input.required<PrivateView | null>();
  roomInfo = input.required<RoomSummary>();
  authService = inject(AuthService);
  gameService = inject(GameService);
  cardsService = inject(CardsService);

  isMyTurn = computed(() => this.sharedGameState().currentPlayerId === this.authService.getPlayerId());

  passTurn() {
    this.gameService.makeMove(this.roomInfo().roomId, []);
  }

  playCards() {
    this.gameService.makeMove(this.roomInfo().roomId, this.cardsService.selectedCards());
  }

  private static playerAngle(offset: number, numPlayers: number): number {
    const angle = 90 * (7 * numPlayers - 4 * offset) / numPlayers
    return angle % 360;
  }

  players = computed<Player[]>(() => {
    const myId = this.authService.getPlayerId();
    const numPlayers = this.roomInfo().playerIds.length;
    const currentPlayerIdx = myId ? this.roomInfo().playerIds.indexOf(this.authService.getPlayerId()) : 0;
    const totalNumPoints = this.sharedGameState().players.reduce((acc, player) => acc + player.numPoints, 0);
    const avgNumPoints = totalNumPoints / numPlayers;
    return this.roomInfo().playerIds.map((playerId, index) => {
      const player = this.sharedGameState().players.find(player => player.playerId === playerId);
      const numPoints = player?.numPoints ?? 0;
      const numCards = player?.numCards ?? 0;
      const offset = (index - currentPlayerIdx + 4) % 4;
      const angleAroundTableDegrees = GameComponent.playerAngle(offset, numPlayers);
      const partialResult = avgNumPoints - numPoints;
      const isOffline = this.roomInfo().offlinePlayers.includes(playerId);
      const isTheirTurn = playerId === this.sharedGameState().currentPlayerId;
      const cards = playerId === myId ? this.privateGameState()?.cards : undefined
      return { playerId, angleAroundTableDegrees, numPoints, partialResult, isOffline, numCards, isTheirTurn, cards };
    });
  });

  positionStyle(angleAroundTableDegrees: number) {
    const angle = (angleAroundTableDegrees / 180) * Math.PI;

    const x = Math.floor(50 * Math.cos(angle) + 50)
    const y = Math.floor(-50 * Math.sin(angle) + 50)

    return `top: ${y}%; left: ${x}%;`;
  }
}
