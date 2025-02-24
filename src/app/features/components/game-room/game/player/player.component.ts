import { Component, input } from '@angular/core';
import { Player } from './player.model';
import { MoneyPipe } from '../../../../../core/pipes/money.pipe';
import { HandComponent } from "./hand/hand.component";
import { HandHistoryComponent } from "./hand-history/hand-history.component";

@Component({
  selector: 'app-player',
  imports: [MoneyPipe, HandComponent, HandHistoryComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  player = input.required<Player>();

  containerPosition(): 'top' | 'right' | 'bottom' | 'left' {
    const angle = this.player().angleAroundTableDegrees;
    if (angle > 45 && angle < 135) {
      return 'top';
    }
    else if (angle > 135 && angle < 225) {
      return 'left';
    }
    else if (angle > 225 && angle < 315) {
      return 'bottom';
    }
    else {
      return 'right';
    }
  }
}
