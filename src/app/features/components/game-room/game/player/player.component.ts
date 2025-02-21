import { Component, input } from '@angular/core';
import { Player } from './player.model';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  player = input.required<Player>();
}
