import { Component, computed, input } from '@angular/core';
import { Hand } from '../player.model';
import { SuitPipe } from '../../../../../../core/pipes/suit.pipe';

@Component({
  selector: 'app-hand-history',
  imports: [SuitPipe],
  templateUrl: './hand-history.component.html',
  styleUrl: './hand-history.component.scss'
})
export class HandHistoryComponent {
  history = input.required<Hand[]>();

  handsToDisplay(): Hand[] {
    return this.history().slice(-2)
  }
}
