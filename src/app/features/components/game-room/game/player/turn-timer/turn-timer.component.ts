import { Component, input } from '@angular/core';

@Component({
  selector: 'app-turn-timer',
  imports: [],
  templateUrl: './turn-timer.component.html',
  styleUrl: './turn-timer.component.scss',
})
export class TurnTimerComponent {
  secondsRemaining = input.required<number>();
}
