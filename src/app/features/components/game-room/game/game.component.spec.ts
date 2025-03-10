import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ComponentRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Card } from '../../../../core/models/card.model';
import { GameService } from '../../../../core/services/game.service';
import { CardsService } from '../../../../core/services/cards.service';
import { Hand } from './player/player.model';

describe('GameComponent', () => {
  let component: GameComponent;
  let componentRef: ComponentRef<GameComponent>;
  let fixture: ComponentFixture<GameComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let cardsServiceSpy: jasmine.SpyObj<CardsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getPlayerId']) },
        { provide: GameService, useValue: jasmine.createSpyObj('GameService', ['makeMove']) },
        { provide: CardsService, useValue: jasmine.createSpyObj('CardsService', ['selectedCards', 'atLeastOneSelected', 'clearSelection']) },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    cardsServiceSpy = TestBed.inject(CardsService) as jasmine.SpyObj<CardsService>;
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('sharedGameState', { players: [], moveHistory: [] });
    componentRef.setInput('privateGameState', null);
    componentRef.setInput('roomInfo', {
      roomId: 123,
      playerIds: ["Alice", "Bob", "Charlie", "Diana"],
      offlinePlayers: ['Charlie'],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should indicate whether it is the players turn', () => {
    authServiceSpy.getPlayerId.and.returnValue("Bob");
    componentRef.setInput('sharedGameState', { currentPlayerId: "Bob" });
    expect(component.isMyTurn()).toBeTrue();
    componentRef.setInput('sharedGameState', { currentPlayerId: "Alice" });
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
  })

  describe('computed players', () => {
    beforeEach(() => {
      componentRef.setInput('sharedGameState', {
        players: [
          { playerId: "Bob", numPoints: 2, numCards: 6, partialCredits: 0 },
          { playerId: "Charlie", numPoints: 3, numCards: 9, partialCredits: 0 },
          { playerId: "Diana", numPoints: 4, numCards: 12, partialCredits: -1 },
          { playerId: "Alice", numPoints: 1, numCards: 3, partialCredits: 1 },
        ],
        currentPlayerId: "Bob",
        moveHistory: [
          { playerId: "Bob", cards: [{ rank: 'A', suit: 'd' }] },
          { playerId: "Charlie", cards: [] },
          { playerId: "Diana", cards: [{ rank: '2', suit: 'd' }] },
          { playerId: "Alice", cards: [{ rank: '2', suit: 'h' }] },
          { playerId: "Bob", cards: [] },
          { playerId: "Charlie", cards: [] },
          { playerId: "Diana", cards: [{ rank: '2', suit: 's' }] },
          { playerId: "Alice", cards: [] },
        ],
      });
    });

    it('should map player Ids', () => {
      const computed = component.players();
      const computedIds = computed.map(player => player.playerId);
      expect(computedIds).toEqual(["Alice", "Bob", "Charlie", "Diana"]);
    });

    it('should map players num. points', () => {
      const computed = component.players();
      const computedPoints = computed.map(player => player.numPoints);
      expect(computedPoints).toEqual([1, 2, 3, 4]);
    });

    it('should map players num. cards', () => {
      const computed = component.players();
      const computedNumCards = computed.map(player => player.numCards);
      expect(computedNumCards).toEqual([3, 6, 9, 12]);
    });

    it('should map players partial results', () => {
      const computed = component.players();
      const computedResults = computed.map(player => player.partialCredit);
      expect(computedResults).toEqual([1, 0, 0, -1]);
    });

    it('should indicate offline players', () => {
      const computed = component.players();
      const computedOffline = computed.map(player => player.isOffline);
      expect(computedOffline).toEqual([false, false, true, false]);
    });

    it('should indicate whose turn it is', () => {
      const computed = component.players();
      const computedOffline = computed.map(player => player.isTheirTurn);
      expect(computedOffline).toEqual([false, true, false, false]);
    });

    it('should seat players clockwise', () => {
      const computed = component.players();
      const computedAngles = computed.map(player => player.angleAroundTableDegrees);
      expect(computedAngles).toEqual([270, 180, 90, 0]);
    });

    it('should place player at bottom of the table if they are logged in', () => {
      authServiceSpy.getPlayerId.and.returnValue("Bob");
      const computed = component.players();
      const computedAngles = computed.map(player => player.angleAroundTableDegrees);
      expect(computedAngles).toEqual([0, 270, 180, 90]);
    });

    it('should map players private cards', () => {
      authServiceSpy.getPlayerId.and.returnValue("Bob");
      const cards: Card[] = [{ rank: 'A', suit: 'd' }]
      componentRef.setInput('privateGameState', { cards });
      const computed = component.players();
      const computedPrivateCards = computed.map(player => player.cards);
      expect(computedPrivateCards).toEqual([undefined, cards, undefined, undefined]);
    });

    it('should map hand history', () => {
      const aliceHistory: Hand[] = [
        { isHandToBeat: false, cards: [{ rank: '2', suit: 'h' }] },
        { isHandToBeat: false, cards: [] },
      ];
      const bobHistory: Hand[] = [
        { isHandToBeat: false, cards: [{ rank: 'A', suit: 'd' }] },
        { isHandToBeat: false, cards: [] },
      ];
      const charlieHistory: Hand[] = [
        { isHandToBeat: false, cards: [] },
        { isHandToBeat: false, cards: [] },
      ];
      const dianaHistory: Hand[] = [
        { isHandToBeat: false, cards: [{ rank: '2', suit: 'd' }] },
        { isHandToBeat: true, cards: [{ rank: '2', suit: 's' }] },
      ];

      const computed = component.players();
      const computedHistory = computed.map(player => player.handHistory);
      expect(computedHistory).toEqual([aliceHistory, bobHistory, charlieHistory, dianaHistory]);
    });
  });
});
