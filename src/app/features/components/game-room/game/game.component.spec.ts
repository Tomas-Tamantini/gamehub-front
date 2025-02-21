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

  it('should generate list of players', () => {
    componentRef.setInput('roomInfo', { playerIds: ["Alice", "Bob"] });
    expect(component.players()).toEqual([{ playerId: "Alice" }, { playerId: "Bob" }]);
  });
});
