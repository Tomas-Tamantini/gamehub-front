import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCardComponent } from './room-card.component';
import { ComponentRef } from '@angular/core';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let componentRef: ComponentRef<RoomCardComponent>;
  let fixture: ComponentFixture<RoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('room', { roomId: 123, playerIds: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to join if room is not full', () => {
    componentRef.setInput('room', { roomId: 123, playerIds: [], isFull: false });
    fixture.detectChanges();
    expect(component.canJoin()).toBeTrue();
  })

  it('should not allow user to join if room is full', () => {
    componentRef.setInput('room', { roomId: 123, playerIds: [], isFull: true });
    fixture.detectChanges();
    expect(component.canJoin()).toBeFalse();
  });
});
