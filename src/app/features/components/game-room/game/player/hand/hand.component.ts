import { Component, inject, input } from '@angular/core';
import { Card } from '../../../../../../core/models/card.model';
import { SuitPipe } from '../../../../../../core/pipes/suit.pipe';
import { CardsService } from '../../../../../../core/services/cards.service';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-hand',
  imports: [SuitPipe, CdkDropList, CdkDrag],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.scss'
})
export class HandComponent {
  numCards = input.required<number>();
  cards = input.required<Card[] | undefined>();
  cardsService = inject(CardsService);

  isSelected(card: Card) {
    return this.cardsService.selectedCards().has(card);
  }

  toggleSelected(card: Card) {
    this.cardsService.toggleSelection(card);
  }

  clearSelection() {
    this.cardsService.clearSelection();
  }

  drop(event: CdkDragDrop<Card[]>) {
    this.cardsService.moveCard(event.previousIndex, event.currentIndex);
  }
}
