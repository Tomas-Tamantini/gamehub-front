import { TestBed } from '@angular/core/testing';

import { GameplayService } from './gameplay.service';
import { SharedGameState } from '../models/shared-view.model';

describe('GameplayService', () => {
  let service: GameplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('willStillPlayThisMatch', () => {
    const gameState = {
      currentPlayerId: 'Bob',
      players: [
        { playerId: 'Alice', numCards: 5 },
        { playerId: 'Bob', numCards: 3 },
        { playerId: 'Charlie', numCards: 2 },
        { playerId: 'Diana', numCards: 0 },
      ],
    } as SharedGameState;

    it('should return false when user is not in the game', () => {
      const playerId = 'not-in-game-player-id';
      const result = service.willStillPlayThisMatch(playerId, gameState);
      expect(result).toBe(false);
    });

    it('should return false when game is not in progress', () => {
      const playerId = 'Alice';
      const modifiedState = { ...gameState, currentPlayerId: undefined };
      const result = service.willStillPlayThisMatch(playerId, modifiedState);
      expect(result).toBe(false);
    });

    it('should return false when player has no cards left', () => {
      const playerId = 'Diana';
      const result = service.willStillPlayThisMatch(playerId, gameState);
      expect(result).toBe(false);
    });

    it('should return false when player plays after someone with zero cards', () => {
      const playerId = 'Alice';
      const result = service.willStillPlayThisMatch(playerId, gameState);
      expect(result).toBe(false);
    });

    it('should return true when player has cards left and no one with zero cards plays before', () => {
      const playerId = 'Charlie';
      const result = service.willStillPlayThisMatch(playerId, gameState);
      expect(result).toBe(true);
    });
  });
});
