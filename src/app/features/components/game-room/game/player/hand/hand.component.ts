import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';
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
export class HandComponent implements OnChanges {
  numCards = input.required<number>();
  cards = input.required<Card[] | undefined>();
  cardsService = inject(CardsService);

  hand() {
    return this.cardsService.getHand();
  }

  isSelected(card: Card) {
    return this.cardsService.isSelected(card);
  }

  toggleSelected(card: Card) {
    this.cardsService.toggleSelection(card);
  }

  clearSelection() {
    this.cardsService.clearSelection();
  }

  sort() {
    this.cardsService.sortHand();
  }

  drop(event: CdkDragDrop<Card[]>) {
    this.cardsService.moveCard(event.previousIndex, event.currentIndex);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cards']?.previousValue != changes['cards']?.currentValue && this.cards() !== undefined) {
      this.cardsService.setHand(this.cards()!);
    }
  }
}
