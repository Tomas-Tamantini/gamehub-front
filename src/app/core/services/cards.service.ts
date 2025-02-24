import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private selected = new Set<Card>();

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
}
