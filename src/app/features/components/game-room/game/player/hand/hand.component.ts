import { Component, input } from '@angular/core';
import { Card } from '../../../../../../core/models/card.model';
import { SuitPipe } from '../../../../../../core/pipes/suit.pipe';

@Component({
  selector: 'app-hand',
  imports: [SuitPipe],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.scss'
})
export class HandComponent {
  numCards = input.required<number>();
  cards = input.required<Card[] | undefined>();
}
