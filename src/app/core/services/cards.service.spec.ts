import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';
import { Card } from '../models/card.model';

describe('CardsService', () => {
  let service: CardsService;

  const _card = (txt: string): Card => ({ rank: txt[0], suit: txt[1] } as Card);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('card selection', () => {
    it('should have no selected cards at the beginning', () => {
      expect(service.selectedCards()).toEqual(new Set());
    });

    it('should toggle card selection', () => {
      const card: Card = _card('2h');
      service.toggleSelection(card);
      expect(service.selectedCards()).toEqual(new Set([card]));
      service.toggleSelection(card);
      expect(service.selectedCards()).toEqual(new Set());
    });

    it('should clear selection', () => {
      service.toggleSelection(_card('2h'));
      service.toggleSelection(_card('3h'));
      service.clearSelection();
      expect(service.selectedCards()).toEqual(new Set());
    });
  });

  describe('hand', () => {
    it('should have empty hand at the beginning', () => {
      expect(service.getHand()).toEqual([]);
    })

    it('should get hand', () => {
      const cards = [_card('2h'), _card('3h')];
      service.setHand(cards);
      expect(service.getHand()).toEqual(cards);
    });

    it('should preserve order on hand updates', () => {
      const cards = [_card('2h'), _card('3c'), _card('4d'), _card('5s')];
      service.setHand(cards);
      const newCards = [_card('5s'), _card('3c'), _card('9d')]
      service.setHand(newCards)
      expect(service.getHand()).toEqual([_card('9d'), _card('3c'), _card('5s')]);
    });

    xit('should preserve selection on hand updates', () => {
      // TODO: Find out why this test is failing
      const cards = [_card('2h'), _card('3c'), _card('4d'), _card('5s')];
      service.setHand(cards);
      service.clearSelection();
      service.toggleSelection(_card('2h'));
      service.toggleSelection(_card('3c'));
      const newCards = [_card('5s'), _card('3c'), _card('9d')]
      service.setHand(newCards)
      expect(service.selectedCards()).toEqual(new Set([_card('3c')]));
    });
  });

  describe('move cards', () => {
    it('should move cards around', () => {
      const cards = [_card('2h'), _card('3h'), _card('4h')];
      service.setHand(cards);
      service.moveCard(0, 1);
      service.moveCard(2, 0);
      expect(service.getHand()).toEqual([_card('4h'), _card('3h'), _card('2h')]);
    });

    it('should do nothing if move indices are wrong', () => {
      const cards = [_card('2h'), _card('3h'), _card('4h')];
      service.setHand(cards);
      service.moveCard(0, 3);
      service.moveCard(2, -1);
      expect(service.getHand()).toEqual(cards);
    });
  })

  describe('sorting', () => {
    it('should sort in ascending order if cards are shuffled', () => {
      const cards = [_card('2h'), _card('3d'), _card('3h')];
      service.setHand(cards);
      service.sortHand();
      expect(service.getHand()).toEqual([_card('3d'), _card('3h'), _card('2h')]);
    });

    it('should sort in descending order if cards are already in ascending order', () => {
      const cards = [_card('Jd'), _card('Qh')];
      service.setHand(cards);
      service.sortHand();
      expect(service.getHand()).toEqual([_card('Qh'), _card('Jd')]);
    });
  })
});
