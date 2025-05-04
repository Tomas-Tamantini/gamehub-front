import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnTimerComponent } from './turn-timer.component';
import { ComponentRef } from '@angular/core';

describe('TurnTimerComponent', () => {
  let component: TurnTimerComponent;
  let componentRef: ComponentRef<TurnTimerComponent>;
  let fixture: ComponentFixture<TurnTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TurnTimerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('turnExpiresAtTimestamp', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('barColor', () => {
    it('should return green when currentWidthPercent is greater than 25', () => {
      component.currentWidthPercent.set(26);
      expect(component.barColor()).toBe('#43a047');
    });

    it('should return red when currentWidthPercent is less than or equal to 25', () => {
      component.currentWidthPercent.set(25);
      expect(component.barColor()).toBe('#e53935');
    });
  });

  // TODO: Test the timer by mocking Date.now()
});
