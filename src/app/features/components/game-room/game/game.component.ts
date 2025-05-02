import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GameStatus } from '../../../../core/models/game-status.model';
import { Card } from '../../../../core/models/card.model';

@Component({
  selector: 'app-game',
  imports: [PlayerComponent, MatCheckboxModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnChanges {
  sharedGameState = input.required<SharedGameState>();
  privateGameState = input.required<PrivateView | null>();
  turnTimer = input.required<TurnTimer | null>();
  roomInfo = input.required<RoomSummary>();
  authService = inject(AuthService);
  gameService = inject(GameService);
  gameplayService = inject(GameplayService);
  cardsService = inject(CardsService);
  autoPassSelected = signal(false);

  isMyTurn = computed(
    () =>
      this.sharedGameState().status === GameStatus.AWAIT_PLAYER_ACTION &&
      this.sharedGameState().currentPlayerId === this.authService.getPlayerId()
  );

  passTurn(): void {
    this.makeMove([]);
    this.cardsService.clearSelection();
  }

  noCardsSelected(): boolean {
    return !this.cardsService.atLeastOneSelected();
  }

  playCards() {
    const selectedCards = this.cardsService.selectedCards();
    this.makeMove(selectedCards);
  }

  private makeMove(selectedCards: Card[]) {
    const roomId = this.roomInfo().roomId;
    this.gameService.makeMove(roomId, selectedCards);
    this.autoPassSelected.set(false);
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sharedGameState']) {
      const newState = changes['sharedGameState']
        .currentValue as SharedGameState;
      if (
        this.autoPassSelected() &&
        newState.currentPlayerId == this.authService.getPlayerId()
      ) {
        if (newState.status == GameStatus.AWAIT_PLAYER_ACTION) this.passTurn();
        else if (newState.status == GameStatus.END_TURN)
          this.autoPassSelected.set(false);
      }
    }
  }
}
