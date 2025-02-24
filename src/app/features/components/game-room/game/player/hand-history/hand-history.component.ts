import { Component, input } from '@angular/core';
import { Hand } from '../player.model';

@Component({
  selector: 'app-hand-history',
  imports: [],
  templateUrl: './hand-history.component.html',
  styleUrl: './hand-history.component.scss'
})
export class HandHistoryComponent {
  history = input.required<Hand[]>();
}
