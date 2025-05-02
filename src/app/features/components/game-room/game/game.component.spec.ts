import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ComponentRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Card } from '../../../../core/models/card.model';
import { GameService } from '../../../../core/services/game.service';
import { CardsService } from '../../../../core/services/cards.service';
import { Hand } from './player/player.model';
import { TurnTimer } from '../../../../core/models/message.model';
import { GameplayService } from '../../../../core/services/gameplay.service';
import { SharedGameState } from '../../../../core/models/shared-view.model';

describe('GameComponent', () => {
  let component: GameComponent;
  let componentRef: ComponentRef<GameComponent>;
  let fixture: ComponentFixture<GameComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let gameplayServiceSpy: jasmine.SpyObj<GameplayService>;
  let cardsServiceSpy: jasmine.SpyObj<CardsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['getPlayerId']),
        },
        {
          provide: GameService,
          useValue: jasmine.createSpyObj('GameService', ['makeMove']),
        },
        {
          provide: GameplayService,
          useValue: jasmine.createSpyObj('GameplayService', [
            'willStillPlayThisMatch',
            'playerHandHistory',
          ]),
        },
        {
          provide: CardsService,
          useValue: jasmine.createSpyObj('CardsService', [
            'selectedCards',
            'atLeastOneSelected',
            'clearSelection',
          ]),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    gameplayServiceSpy = TestBed.inject(
      GameplayService
    ) as jasmine.SpyObj<GameplayService>;
    const mockGenerator = function* () {
      yield* [];
    };
    gameplayServiceSpy.playerHandHistory = jasmine
      .createSpy()
      .and.callFake(mockGenerator);
    cardsServiceSpy = TestBed.inject(
      CardsService
    ) as jasmine.SpyObj<CardsService>;
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('sharedGameState', { players: [], moveHistory: [] });
    componentRef.setInput('privateGameState', null);
    componentRef.setInput('turnTimer', null);
    componentRef.setInput('roomInfo', {
      roomId: 123,
      playerIds: ['Alice', 'Bob', 'Charlie', 'Diana'],
      offlinePlayers: ['Charlie'],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should indicate whether it is the players turn', () => {
    authServiceSpy.getPlayerId.and.returnValue('Bob');
    componentRef.setInput('sharedGameState', { currentPlayerId: 'Bob' });
    expect(component.isMyTurn()).toBeTrue();
    componentRef.setInput('sharedGameState', { currentPlayerId: 'Alice' });
    expect(component.isMyTurn()).toBeFalse();
  });

  it('should indicate whether no card has been selected', () => {
    cardsServiceSpy.atLeastOneSelected.and.returnValue(false);
    expect(component.noCardsSelected()).toBeTrue();
    cardsServiceSpy.atLeastOneSelected.and.returnValue(true);
    expect(component.noCardsSelected()).toBeFalse();
  });

  describe('make move', () => {
    it('should pass turn', () => {
      component.passTurn();
      expect(gameServiceSpy.makeMove).toHaveBeenCalledWith(123, []);
    });

    it('should clear selection after passing turn', () => {
      component.passTurn();
      expect(cardsServiceSpy.clearSelection).toHaveBeenCalled();
    });

    it('should play cards', () => {
      const cards: Card[] = [{ rank: 'A', suit: 'd' }];
      cardsServiceSpy.selectedCards.and.returnValue(cards);
      component.playCards();
      expect(gameServiceSpy.makeMove).toHaveBeenCalledWith(123, cards);
    });
  });

  const mockSharedState = {
    players: [
      { playerId: 'Bob', numPoints: 2, numCards: 6, partialCredits: 0 },
      { playerId: 'Charlie', numPoints: 3, numCards: 9, partialCredits: 0 },
      { playerId: 'Diana', numPoints: 4, numCards: 12, partialCredits: -1 },
      { playerId: 'Alice', numPoints: 1, numCards: 3, partialCredits: 1 },
    ],
    currentPlayerId: 'Bob',
  } as SharedGameState;

  describe('computed players', () => {
    beforeEach(() => {
      componentRef.setInput('sharedGameState', mockSharedState);
    });

    it('should map player Ids', () => {
      const computed = component.players();
      const computedIds = computed.map((player) => player.playerId);
      expect(computedIds).toEqual(['Alice', 'Bob', 'Charlie', 'Diana']);
    });

    it('should map players num. points', () => {
      const computed = component.players();
      const computedPoints = computed.map((player) => player.numPoints);
      expect(computedPoints).toEqual([1, 2, 3, 4]);
    });

    it('should map players num. cards', () => {
      const computed = component.players();
      const computedNumCards = computed.map((player) => player.numCards);
      expect(computedNumCards).toEqual([3, 6, 9, 12]);
    });

    it('should map players partial results', () => {
      const computed = component.players();
      const computedResults = computed.map((player) => player.partialCredit);
      expect(computedResults).toEqual([1, 0, 0, -1]);
    });

    it('should indicate offline players', () => {
      const computed = component.players();
      const computedOffline = computed.map((player) => player.isOffline);
      expect(computedOffline).toEqual([false, false, true, false]);
    });

    it('should indicate whose turn it is', () => {
      const computed = component.players();
      const computedOffline = computed.map((player) => player.isTheirTurn);
      expect(computedOffline).toEqual([false, true, false, false]);
    });

    it('should seat players clockwise', () => {
      const computed = component.players();
      const computedAngles = computed.map(
        (player) => player.angleAroundTableDegrees
      );
      expect(computedAngles).toEqual([270, 180, 90, 0]);
    });

    it('should place player at bottom of the table if they are logged in', () => {
      authServiceSpy.getPlayerId.and.returnValue('Bob');
      const computed = component.players();
      const computedAngles = computed.map(
        (player) => player.angleAroundTableDegrees
      );
      expect(computedAngles).toEqual([0, 270, 180, 90]);
    });

    it('should map players private cards', () => {
      authServiceSpy.getPlayerId.and.returnValue('Bob');
      const cards: Card[] = [{ rank: 'A', suit: 'd' }];
      componentRef.setInput('privateGameState', { cards });
      const computed = component.players();
      const computedPrivateCards = computed.map((player) => player.cards);
      expect(computedPrivateCards).toEqual([
        undefined,
        cards,
        undefined,
        undefined,
      ]);
    });

    it('should map turn timer for each player', () => {
      const timer = {
        playerId: 'Bob',
        secondsRemaining: 30,
      } as TurnTimer;
      componentRef.setInput('turnTimer', timer);
      const computed = component.players();
      const computedTimer = computed.map(
        (player) => player.secondsRemainingInTurn
      );
      expect(computedTimer).toEqual([undefined, 30, undefined, undefined]);
    });

    it('should map hand history', () => {
      const aliceHistory: Hand[] = [
        {
          isHandToBeat: false,
          cards: [{ rank: '2', suit: 'h' }],
          isBotMove: false,
        },
      ];
      const bobHistory: Hand[] = [
        { isHandToBeat: false, cards: [], isBotMove: false },
      ];
      const charlieHistory: Hand[] = [
        { isHandToBeat: false, cards: [], isBotMove: true },
      ];
      const dianaHistory: Hand[] = [
        {
          isHandToBeat: true,
          cards: [{ rank: '2', suit: 's' }],
          isBotMove: false,
        },
      ];
      const mockHistoryGenerator = function* (playerId: string) {
        if (playerId === 'Alice') yield* aliceHistory;
        else if (playerId === 'Bob') yield* bobHistory;
        else if (playerId === 'Charlie') yield* charlieHistory;
        else if (playerId === 'Diana') yield* dianaHistory;
      };
      gameplayServiceSpy.playerHandHistory.and.callFake(mockHistoryGenerator);
      const computed = component.players();
      const computedHistory = computed.map((player) => player.handHistory);
      expect(computedHistory).toEqual([
        aliceHistory,
        bobHistory,
        charlieHistory,
        dianaHistory,
      ]);
    });
  });

  describe('autoPass', () => {
    it('should not allow auto pass if it is users turn', () => {
      authServiceSpy.getPlayerId.and.returnValue('Bob');
      componentRef.setInput('sharedGameState', mockSharedState);
      expect(component.canAutoPass()).toBeFalse();
    });

    it('should call gameplay service with proper arguments', () => {
      authServiceSpy.getPlayerId.and.returnValue('Diana');
      gameplayServiceSpy.willStillPlayThisMatch.and.returnValue(false);
      componentRef.setInput('sharedGameState', mockSharedState);
      component.canAutoPass();
      expect(gameplayServiceSpy.willStillPlayThisMatch).toHaveBeenCalledWith(
        'Diana',
        mockSharedState
      );
    });

    it('should not allow auto pass if player will not play during match', () => {
      authServiceSpy.getPlayerId.and.returnValue('Diana');
      gameplayServiceSpy.willStillPlayThisMatch.and.returnValue(false);
      expect(component.canAutoPass()).toBeFalse();
    });

    it('should allow auto pass if player will still play during match', () => {
      authServiceSpy.getPlayerId.and.returnValue('Diana');
      gameplayServiceSpy.willStillPlayThisMatch.and.returnValue(true);
      expect(component.canAutoPass()).toBeTrue();
    });
  });
});
