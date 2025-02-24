import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private hand: Card[] = [];
  private selected: Card[] = [];

  private cardIndex(card: Card): number {
    return this.hand.findIndex(
      c => c.rank === card.rank && c.suit === card.suit
    );
  }

  private static cardValue(card: Card): number {
    const sortedRanks = "3456789TJQKA2";
    const sortedSuits = "dhsc";
    const suitValue = sortedSuits.indexOf(card.suit);
    const rankValue = sortedRanks.indexOf(card.rank);
    return rankValue * 4 + suitValue;
  }

  toggleSelection(card: Card): void {
    if (this.isSelected(card)) {
      this.selected = this.selected.filter(c => c.rank !== card.rank || c.suit !== card.suit);
    }
    else {
      this.selected.push(card);
    }
  }

  selectedCards(): Card[] {
    return this.selected;
  }

  isSelected(card: Card): boolean {
    return this.selected.some(c => c.rank === card.rank && c.suit === card.suit);
  }

  clearSelection(): void {
    this.selected = [];
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
    this.selected = this.hand.filter(card => this.isSelected(card));
  }

  getHand(): Card[] {
    return this.hand;
  }

  sortHand(): void {
    const isAscending = this.hand.every((card, i) => {
      return i === 0 || CardsService.cardValue(card) > CardsService.cardValue(this.hand[i - 1]);
    });
    this.hand.sort((a, b) => {
      return CardsService.cardValue(a) - CardsService.cardValue(b);
    });
    if (isAscending) this.hand.reverse();
  }
}
