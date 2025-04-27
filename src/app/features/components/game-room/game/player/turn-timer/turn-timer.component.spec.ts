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
    componentRef.setInput('secondsRemaining', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('widthPercent', () => {
    it('should return 0 when secondsRemaining is negative', () => {
      componentRef.setInput('secondsRemaining', -1);
      expect(component.initialWidthPercent()).toBe(0);
    });

    it('should return 0 when secondsRemaining is 0', () => {
      componentRef.setInput('secondsRemaining', 0);
      expect(component.initialWidthPercent()).toBe(0);
    });

    it('should return 100 when secondsRemaining is 30', () => {
      componentRef.setInput('secondsRemaining', 30);
      expect(component.initialWidthPercent()).toBe(100);
    });

    it('should return 100 when secondsRemaining is larger than 30', () => {
      componentRef.setInput('secondsRemaining', 31);
      expect(component.initialWidthPercent()).toBe(100);
    });

    it('should return a value between 0 and 100 when secondsRemaining is between 0 and 30', () => {
      componentRef.setInput('secondsRemaining', 12);
      expect(component.initialWidthPercent()).toBe(40);
    });
  });
});
