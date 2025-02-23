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
    componentRef.setInput('sharedGameState', {});
    componentRef.setInput('privateGameState', null);
    componentRef.setInput('roomInfo', { playerIds: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('computed players', () => {
    const playerIds = ["Alice", "Bob", "Charlie", "Diana"];
    beforeEach(() => {
      componentRef.setInput('sharedGameState', {
        players: [
          { playerId: "Bob", numPoints: 2 },
          { playerId: "Charlie", numPoints: 3 },
          { playerId: "Diana", numPoints: 4 },
          { playerId: "Alice", numPoints: 1 },
        ]
      });
    });

    it('should map player Ids', () => {
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedIds = computed.map(player => player.playerId);
      expect(computedIds).toEqual(playerIds);
    });

    it('should map players num. points', () => {
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedPoints = computed.map(player => player.numPoints);
      expect(computedPoints).toEqual([1, 2, 3, 4]);
    });

    it('should seat players clockwise', () => {
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedAngles = computed.map(player => player.angleAroundTableDegrees);
      expect(computedAngles).toEqual([270, 180, 90, 0]);
    });

    it('should place player at bottom of the table if they are logged in', () => {
      authServiceSpy.getPlayerId.and.returnValue("Bob");
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedAngles = computed.map(player => player.angleAroundTableDegrees);
      expect(computedAngles).toEqual([0, 270, 180, 90]);
    });
  });
});
