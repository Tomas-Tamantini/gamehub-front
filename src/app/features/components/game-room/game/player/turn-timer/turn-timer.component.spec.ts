import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnTimerComponent } from './turn-timer.component';
import { ComponentRef } from '@angular/core';

xdescribe('TurnTimerComponent', () => {
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
      componentRef.setInput('turnExpiresAtTimestamp', 30);
      component.ngOnInit();
      expect(component.barColor()).toBe('#43a047');
    });

    it('should return red when currentWidthPercent is less than or equal to 25', () => {
      componentRef.setInput('turnExpiresAtTimestamp', 5);
      component.ngOnInit();
      expect(component.barColor()).toBe('#e53935');
    });
  });

  describe('widthPercent', () => {
    it('should return 0 when secondsRemaining is negative', () => {
      componentRef.setInput('turnExpiresAtTimestamp', -1);
      component.ngOnInit();
      expect(component.currentWidthPercent()).toBe(0);
    });

    it('should return 0 when secondsRemaining is 0', () => {
      componentRef.setInput('turnExpiresAtTimestamp', 0);
      component.ngOnInit();
      expect(component.currentWidthPercent()).toBe(0);
    });

    it('should return 100 when secondsRemaining is 30', () => {
      componentRef.setInput('turnExpiresAtTimestamp', 30);
      component.ngOnInit();
      expect(component.currentWidthPercent()).toBe(100);
    });

    it('should return 100 when secondsRemaining is larger than 30', () => {
      componentRef.setInput('turnExpiresAtTimestamp', 31);
      component.ngOnInit();
      expect(component.currentWidthPercent()).toBe(100);
    });

    it('should return a value between 0 and 100 when secondsRemaining is between 0 and 30', () => {
      componentRef.setInput('turnExpiresAtTimestamp', 12);
      component.ngOnInit();
      expect(component.currentWidthPercent()).toBe(40);
    });
  });
});
