import { Component, input } from '@angular/core';
import { Card } from '../../../../../../core/models/card.model';

@Component({
  selector: 'app-hand',
  imports: [],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.scss'
})
export class HandComponent {
  numCards = input.required<number>();
  cards = input.required<Card[] | undefined>();
}
