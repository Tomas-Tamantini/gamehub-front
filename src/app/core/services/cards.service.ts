import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private hand: Card[] = [];
  private selected = new Set<Card>();

  private cardIndex(card: Card): number {
    return this.hand.findIndex(
      c => c.rank === card.rank && c.suit === card.suit
    );
  }

  toggleSelection(card: Card): void {
    if (this.selected.has(card)) {
      this.selected.delete(card);
    } else {
      this.selected.add(card);
    }
  }

  selectedCards(): Set<Card> {
    return this.selected;
  }

  clearSelection(): void {
    this.selected = new Set<Card>();
  }

  moveCard(previousIndex: number, newIndex: number): void {
    const card = this.hand[previousIndex];
    this.hand.splice(previousIndex, 1);
    this.hand.splice(newIndex, 0, card);
  }

  setHand(cards: Card[]): void {
    this.hand = cards.sort((a, b) => {
      return this.cardIndex(a) - this.cardIndex(b);
    });
  }

  getHand(): Card[] {
    return this.hand;
  }
}
