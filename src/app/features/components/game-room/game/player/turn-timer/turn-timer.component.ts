import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-turn-timer',
  imports: [],
  templateUrl: './turn-timer.component.html',
  styleUrl: './turn-timer.component.scss',
})
export class TurnTimerComponent {
  secondsRemaining = input.required<number>();

  initialWidthPercent = computed(() => {
    if (this.secondsRemaining() <= 0) return 0;
    return Math.max(0, Math.min(100, (this.secondsRemaining() / 30) * 100));
  });
}
