import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ComponentRef } from '@angular/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let componentRef: ComponentRef<GameComponent>;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('gameState', {});
    componentRef.setInput('roomInfo', { playerIds: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('computed players', () => {
    it('should map player Ids', () => {
      const playerIds = ["Alice", "Bob"];
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedIds = computed.map(player => player.playerId);
      expect(computedIds).toEqual(playerIds);
    });

    it('should set the angle around the table for each player', () => {
      const playerIds = ["Alice", "Bob", "Charlie", "Diana"];
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedAngles = computed.map(player => player.angleAroundTableDegrees);
      expect(computedAngles).toEqual([0, 90, 180, 270]);
    });
  });
});
