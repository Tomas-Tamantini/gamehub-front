import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomCardComponent } from './room-card.component';
import { ComponentRef } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let componentRef: ComponentRef<RoomCardComponent>;
  let fixture: ComponentFixture<RoomCardComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCardComponent],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomCardComponent);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
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

  describe('enter room', () => {
    it('should redirect to game page', () => {
      component.enterRoom('join');
      const expectedRoute = ['/room', 123];
      expect(navigateSpy).toHaveBeenCalledWith(expectedRoute, jasmine.any(Object));
    });

    it('should redirect with action "join"', () => {
      component.enterRoom('join');
      const expectedParams = { queryParams: { action: 'join' } };
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.any(Array), expectedParams);
    });

    it('should redirect with action "watch"', () => {
      component.enterRoom('watch');
      const expectedParams = { queryParams: { action: 'join' } };
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.any(Array), expectedParams);
    });

    it('should redirect with action "rejoin"', () => {
      component.enterRoom('rejoin');
      const expectedParams = { queryParams: { action: 'join' } };
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.any(Array), expectedParams);
    });
  })
});
