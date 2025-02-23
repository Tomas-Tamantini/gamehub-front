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

    it('should seat players clockwise', () => {
      const playerIds = ["Alice", "Bob", "Charlie", "Diana"];
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedAngles = computed.map(player => player.angleAroundTableDegrees);
      expect(computedAngles).toEqual([270, 180, 90, 0]);
    });

    it('should place player at bottom of the table if they are logged in', () => {
      authServiceSpy.getPlayerId.and.returnValue("Bob");
      const playerIds = ["Alice", "Bob", "Charlie", "Diana"];
      componentRef.setInput('roomInfo', { playerIds });
      const computed = component.players();
      const computedAngles = computed.map(player => player.angleAroundTableDegrees);
      expect(computedAngles).toEqual([0, 270, 180, 90]);
    });
  });
});
