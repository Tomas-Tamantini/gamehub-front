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
  private totalSeconds = 30;
  secondsRemaining = input.required<number>();

  currentWidthPercent = signal(0);

  private intervalId: any;

  ngOnInit(): void {
    this.currentWidthPercent.set(this.initialWidthPercent());
    this.intervalId = setInterval(() => {
      const newWidth = this.currentWidthPercent() - 1;
      this.currentWidthPercent.set(newWidth);
      if (newWidth <= 0) {
        clearInterval(this.intervalId!);
        this.intervalId = null;
      }
    }, this.totalSeconds * 10);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private initialWidthPercent(): number {
    if (this.secondsRemaining() <= 0) return 0;
    return Math.max(
      0,
      Math.min(100, (this.secondsRemaining() / this.totalSeconds) * 100)
    );
  }

  barColor = computed(() => {
    if (this.currentWidthPercent() > 25) return '#43a047';
    else return '#e53935';
  });
}
