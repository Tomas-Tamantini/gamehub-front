import { Component, input } from '@angular/core';
import { Player } from './player.model';
import { MoneyPipe } from '../../../../../core/pipes/money.pipe';

@Component({
  selector: 'app-player',
  imports: [MoneyPipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  player = input.required<Player>();
}
