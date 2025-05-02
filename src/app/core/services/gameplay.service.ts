import { Injectable } from '@angular/core';
import { SharedGameState } from '../models/shared-view.model';

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
