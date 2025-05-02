import { Component, computed, inject, input } from '@angular/core';
import { RoomSummary } from '../../../../core/models/room-summary.model';
import { Player } from './player/player.model';
import { PlayerComponent } from './player/player.component';
import { AuthService } from '../../../../core/services/auth.service';
import { SharedGameState } from '../../../../core/models/shared-view.model';
import { PrivateView } from '../../../../core/models/private-view.model';
import { GameService } from '../../../../core/services/game.service';
import { CardsService } from '../../../../core/services/cards.service';
import { TurnTimer } from '../../../../core/models/message.model';
import { GameplayService } from '../../../../core/services/gameplay.service';

@Component({
  selector: 'app-game',
  imports: [PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  sharedGameState = input.required<SharedGameState>();
  privateGameState = input.required<PrivateView | null>();
  turnTimer = input.required<TurnTimer | null>();
  roomInfo = input.required<RoomSummary>();
  authService = inject(AuthService);
  gameService = inject(GameService);
  gameplayService = inject(GameplayService);
  cardsService = inject(CardsService);

  isMyTurn = computed(
    () =>
      this.sharedGameState().currentPlayerId === this.authService.getPlayerId()
  );

  passTurn(): void {
    this.gameService.makeMove(this.roomInfo().roomId, []);
    this.cardsService.clearSelection();
  }

  noCardsSelected(): boolean {
    return !this.cardsService.atLeastOneSelected();
  }

  playCards() {
    const roomId = this.roomInfo().roomId;
    const selectedCards = this.cardsService.selectedCards();
    this.gameService.makeMove(roomId, selectedCards);
  }

  players = computed<Player[]>(() => {
    const myId = this.authService.getPlayerId();
    const playerIds = this.sharedGameState().players.map(
      (player) => player.playerId
    );
    const angles = this.gameplayService.anglesAroundTableDegrees(
      playerIds,
      myId
    );
    return this.sharedGameState().players.map((player) => {
      const playerId = player.playerId;
      const numPoints = player?.numPoints ?? 0;
      const numCards = player?.numCards ?? 0;
      const angleAroundTableDegrees = angles[playerId];
      const partialCredit = player?.partialCredits ?? 0;
      const isOffline = this.roomInfo().offlinePlayers.includes(playerId);
      const isTheirTurn = playerId === this.sharedGameState().currentPlayerId;
      const cards =
        playerId === myId ? this.privateGameState()?.cards : undefined;
      const handHistory = Array.from(
        this.gameplayService.playerHandHistory(
          playerId,
          this.sharedGameState().moveHistory
        )
      );
      const secondsRemainingInTurn =
        this.turnTimer()?.playerId === playerId
          ? this.turnTimer()?.secondsRemaining
          : undefined;
      return {
        playerId,
        angleAroundTableDegrees,
        numPoints,
        partialCredit,
        isOffline,
        numCards,
        isTheirTurn,
        cards,
        handHistory,
        secondsRemainingInTurn,
      };
    });
  });

  positionStyle(angleAroundTableDegrees: number) {
    const angle = (angleAroundTableDegrees / 180) * Math.PI;

    const x = Math.floor(50 * Math.cos(angle) + 50);
    const y = Math.floor(-50 * Math.sin(angle) + 50);

    return `top: ${y}%; left: ${x}%;`;
  }

  canAutoPass(): boolean {
    const myId = this.authService.getPlayerId();
    const currentPlayerId = this.sharedGameState().currentPlayerId;
    if (currentPlayerId == myId) return false;
    return this.gameplayService.willStillPlayThisMatch(
      myId,
      this.sharedGameState()
    );
  }
}
