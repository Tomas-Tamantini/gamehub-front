import { TestBed } from '@angular/core/testing';

import { GameplayService } from './gameplay.service';
import { Move, SharedGameState } from '../models/shared-view.model';
import { Hand } from '../../features/components/game-room/game/player/player.model';

describe('GameplayService', () => {
  let service: GameplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('playerHandHistory', () => {
    const moveHistory: Move[] = [
      {
        playerId: 'Alice',
        cards: [{ rank: '3', suit: 'h' }],
        isBotMove: false,
      },
      { playerId: 'Bob', cards: [], isBotMove: true },
      {
        playerId: 'Charlie',
        cards: [{ rank: '5', suit: 'c' }],
        isBotMove: false,
      },
      {
        playerId: 'Diana',
        cards: [{ rank: '6', suit: 'h' }],
        isBotMove: false,
      },
      { playerId: 'Alice', cards: [], isBotMove: true },
    ];

    it('should return hand history for given player', () => {
      const playerId = 'Alice';
      const expectedHistory: Hand[] = [
        {
          cards: [{ rank: '3', suit: 'h' }],
          isHandToBeat: false,
          isBotMove: false,
        },
        {
          cards: [],
          isHandToBeat: false,
          isBotMove: true,
        },
      ];
      const result = service.playerHandHistory(playerId, moveHistory);
      expect(Array.from(result)).toEqual(expectedHistory);
    });

    it('should assign last non-pass move as hand to beat', () => {
      const playerId = 'Diana';
      const expectedHistory: Hand[] = [
        {
          cards: [{ rank: '6', suit: 'h' }],
          isHandToBeat: true,
          isBotMove: false,
        },
      ];
      const result = service.playerHandHistory(playerId, moveHistory);
      expect(Array.from(result)).toEqual(expectedHistory);
    });
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

  describe('angles around table', () => {
    it('should place players evenly spaced around the table seated clockwise', () => {
      const playerIds = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
      const expectedAngles = {
        Alice: 270,
        Bob: 210,
        Charlie: 150,
        Diana: 90,
        Eve: 30,
        Frank: 330,
      };
      const result = service.anglesAroundTableDegrees(playerIds);
      expect(result).toEqual(expectedAngles);
    });

    it('should place logged player at the bottom of the table', () => {
      const myId = 'Bob';
      const playerIds = ['Alice', 'Bob', 'Charlie', 'Diana'];
      const expectedAngles = {
        Alice: 0,
        Bob: 270,
        Charlie: 180,
        Diana: 90,
      };
      const result = service.anglesAroundTableDegrees(playerIds, myId);
      expect(result).toEqual(expectedAngles);
    });
  });
});
