import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { ComponentRef } from '@angular/core';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let componentRef: ComponentRef<PlayerComponent>;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('player', { playerId: 'Alice', handHistory: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
