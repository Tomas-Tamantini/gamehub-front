import { Injectable } from '@angular/core';
import { Move, SharedGameState } from '../models/shared-view.model';
import { Hand } from '../../features/components/game-room/game/player/player.model';

@Injectable({
  providedIn: 'root',
})
export class GameplayService {
  private static *indicesBetween(
    playerAIdx: number,
    playerBIdx: number,
    numPlayers: number
  ): Generator<number> {
    for (let offset = 1; offset <= numPlayers; offset++) {
      const currentIdx = (playerAIdx + offset) % numPlayers;
      if (currentIdx === playerBIdx % numPlayers) break;
      yield currentIdx;
    }
  }

  static playerIndex(playerId: string, gameState: SharedGameState): number {
    return gameState.players.findIndex(
      (player) => player.playerId === playerId
    );
  }

  private indexOfHandToBeat(moveHistory: Move[]) {
    for (let i = moveHistory.length - 1; i >= 0; i--)
      if (moveHistory[i].cards.length > 0) return i;
    return -1;
  }

  *playerHandHistory(playerId: string, moveHistory: Move[]): Generator<Hand> {
    const idxOfHandToBeat = this.indexOfHandToBeat(moveHistory);
    for (const [idx, move] of moveHistory.entries()) {
      if (move.playerId === playerId) {
        yield {
          cards: move.cards,
          isHandToBeat: idx === idxOfHandToBeat,
          isBotMove: move.isBotMove,
        };
      }
    }
  }

  willStillPlayThisMatch(
    playerId: string,
    gameState: SharedGameState
  ): boolean {
    if (!gameState.currentPlayerId) return false;
    const playerIdx = GameplayService.playerIndex(playerId, gameState);
    if (playerIdx < 0) return false;
    const activeTurnPlayerIdx = GameplayService.playerIndex(
      gameState.currentPlayerId,
      gameState
    );
    const indicesBetween = Array.from(
      GameplayService.indicesBetween(
        activeTurnPlayerIdx,
        playerIdx + 1,
        gameState.players.length
      )
    );
    const playersBetween = indicesBetween.map((index) => {
      return gameState.players[index];
    });
    return playersBetween.every((player) => player.numCards > 0);
  }
}
