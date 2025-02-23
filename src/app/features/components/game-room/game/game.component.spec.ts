import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ComponentRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let componentRef: ComponentRef<GameComponent>;
  let fixture: ComponentFixture<GameComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getPlayerId']) },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('sharedGameState', { players: [] });
    componentRef.setInput('privateGameState', null);
    componentRef.setInput('roomInfo', {
      playerIds: ["Alice", "Bob", "Charlie", "Diana"],
      offlinePlayers: ['Charlie']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('computed players', () => {
    beforeEach(() => {
      componentRef.setInput('sharedGameState', {
        players: [
          { playerId: "Bob", numPoints: 2, numCards: 6 },
          { playerId: "Charlie", numPoints: 3, numCards: 9 },
          { playerId: "Diana", numPoints: 4, numCards: 12 },
          { playerId: "Alice", numPoints: 1, numCards: 3 },
        ]
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

    it('should calculate players partial results', () => {
      const computed = component.players();
      const computedResults = computed.map(player => player.partialResult);
      expect(computedResults).toEqual([1.5, 0.5, -0.5, -1.5]);
    });

    it('should indicate offline players', () => {
      const computed = component.players();
      const computedOffline = computed.map(player => player.isOffline);
      expect(computedOffline).toEqual([false, false, true, false]);
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
  });
});
