import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';
import { Card } from '../models/card.model';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no selected cards at the beginning', () => {
    expect(service.selectedCards()).toEqual(new Set());
  });

  it('should toggle card selection', () => {
    const card: Card = { rank: '2', suit: 'h' };
    service.toggleSelection(card);
    expect(service.selectedCards()).toEqual(new Set([card]));
    service.toggleSelection(card);
    expect(service.selectedCards()).toEqual(new Set());
  });
});
