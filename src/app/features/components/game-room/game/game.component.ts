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

  private static playerAngle(offset: number, numPlayers: number): number {
    const angle = (90 * (7 * numPlayers - 4 * offset)) / numPlayers;
    return angle % 360;
  }

  players = computed<Player[]>(() => {
    const myId = this.authService.getPlayerId();
    const numPlayers = this.roomInfo().playerIds.length;
    const currentPlayerIdx = myId
      ? this.roomInfo().playerIds.indexOf(this.authService.getPlayerId())
      : 0;
    const handToBeat = this.sharedGameState()
      .moveHistory.slice()
      .reverse()
      .find((move) => move.cards.length > 0)?.cards;
    return this.roomInfo().playerIds.map((playerId, index) => {
      const player = this.sharedGameState().players.find(
        (player) => player.playerId === playerId
      );
      const numPoints = player?.numPoints ?? 0;
      const numCards = player?.numCards ?? 0;
      const offset = (index - currentPlayerIdx + 4) % 4;
      const angleAroundTableDegrees = GameComponent.playerAngle(
        offset,
        numPlayers
      );
      const partialCredit = player?.partialCredits ?? 0;
      const isOffline = this.roomInfo().offlinePlayers.includes(playerId);
      const isTheirTurn = playerId === this.sharedGameState().currentPlayerId;
      const cards =
        playerId === myId ? this.privateGameState()?.cards : undefined;
      const handHistory = this.sharedGameState()
        .moveHistory.filter((move) => move.playerId === playerId)
        .map((move) => ({
          cards: move.cards,
          isHandToBeat: move.cards == handToBeat,
        }));
      let secondsRemainingInTurn: number | undefined =
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
}
