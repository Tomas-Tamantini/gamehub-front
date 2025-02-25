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
    const sorted = this.selected.sort((a, b) => {
      return CardsService.cardValue(a) - CardsService.cardValue(b);
    });
    const ranks = sorted.map(card => card.rank).join('');
    if (ranks === '345A2') return sorted.slice(3).concat(sorted.slice(0, 3));
    else if (ranks === '34562') return sorted.slice(4).concat(sorted.slice(0, 4));
    else return sorted;
  }

  isSelected(card: Card): boolean {
    return this.selected.some(c => c.rank === card.rank && c.suit === card.suit);
  }

  atLeastOneSelected(): boolean {
    return this.selected.length > 0;
  }

  clearSelection(): void {
    this.selected = [];
  }

  moveCard(previousIndex: number, newIndex: number): void {
    if (previousIndex < 0 || previousIndex >= this.hand.length) return;
    if (newIndex < 0 || newIndex >= this.hand.length) return;
    const card = this.hand[previousIndex];
    this.hand.splice(previousIndex, 1);
    this.hand.splice(newIndex, 0, card);
  }

  setHand(cards: Card[]): void {
    const ordered = cards.slice().sort((a, b) => {
      return this.cardIndex(a) - this.cardIndex(b);
    });
    this.hand = ordered;
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
