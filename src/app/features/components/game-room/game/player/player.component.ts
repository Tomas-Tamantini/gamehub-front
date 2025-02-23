import { Component, input } from '@angular/core';
import { Player } from './player.model';
import { MoneyPipe } from '../../../../../core/pipes/money.pipe';
import { HandComponent } from "./hand/hand.component";

@Component({
  selector: 'app-player',
  imports: [MoneyPipe, HandComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  player = input.required<Player>();
}
