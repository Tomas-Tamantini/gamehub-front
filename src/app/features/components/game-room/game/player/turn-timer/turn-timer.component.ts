import {
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-turn-timer',
  imports: [],
  templateUrl: './turn-timer.component.html',
  styleUrl: './turn-timer.component.scss',
})
export class TurnTimerComponent implements OnInit, OnDestroy {
  private readonly totalSeconds = 30;
  turnExpiresAtTimestamp = input.required<number>();

  currentWidthPercent = signal(0);

  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const currentTimestampSeconds = Math.floor(Date.now() / 1000);
      const secondsRemaining =
        this.turnExpiresAtTimestamp() - currentTimestampSeconds;
      if (secondsRemaining < 0) {
        this.currentWidthPercent.set(0);
        this.stopTimer();
      } else if (secondsRemaining <= this.totalSeconds) {
        this.currentWidthPercent.set(
          (secondsRemaining / this.totalSeconds) * 100
        );
      } else this.currentWidthPercent.set(100);
    }, 1000);
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  barColor = computed(() => {
    if (this.currentWidthPercent() > 25) return '#43a047';
    else return '#e53935';
  });
}
