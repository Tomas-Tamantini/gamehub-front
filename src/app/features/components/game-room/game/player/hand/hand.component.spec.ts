import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandComponent } from './hand.component';
import { ComponentRef } from '@angular/core';
import { Card } from '../../../../../../core/models/card.model';
import { CardsService } from '../../../../../../core/services/cards.service';

describe('HandComponent', () => {
  let component: HandComponent;
  let componentRef: ComponentRef<HandComponent>;
  let fixture: ComponentFixture<HandComponent>;
  let cardsServiceSpy: jasmine.SpyObj<CardsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandComponent],
      providers: [
        {
          provide: CardsService, useValue: jasmine.createSpyObj('CardsService', [
            'toggleSelection',
            'selectedCards',
            'clearSelection',
            'moveCard',
            'sortHand',
            'setHand',
            'getHand'
          ])
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HandComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('numCards', 5);
    componentRef.setInput('cards', undefined);
    cardsServiceSpy = TestBed.inject(CardsService) as jasmine.SpyObj<CardsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hand whenever input changes', () => {
    const cards: Card[] = [{ suit: 'h', rank: '2' }]
    componentRef.setInput('cards', cards)
    cardsServiceSpy.selectedCards.and.returnValue(new Set());
    fixture.detectChanges();
    expect(cardsServiceSpy.setHand).toHaveBeenCalledWith(cards);
  });

  it('should get hand from service', () => {
    cardsServiceSpy.getHand.and.returnValue([{ suit: 'h', rank: '2' }]);
    expect(component.hand()).toEqual([{ suit: 'h', rank: '2' }]);
  })

  describe('card selection', () => {
    it('should toggle card selection', () => {
      const card: Card = { suit: 'h', rank: '2' };
      component.toggleSelected(card);
      expect(cardsServiceSpy.toggleSelection).toHaveBeenCalledWith(card);
    });


    it('should indicate whether card is selected', () => {
      const card: Card = { suit: 'h', rank: '2' };
      cardsServiceSpy.selectedCards.and.returnValue(new Set([card]));
      expect(component.isSelected(card)).toBeTrue();
      expect(component.isSelected({ suit: 'h', rank: '3' })).toBeFalse();
    });

    it('should clear selection', () => {
      component.clearSelection();
      expect(cardsServiceSpy.clearSelection).toHaveBeenCalled();
    });
  });

  describe('card reordering', () => {
    it('should move cards', () => {
      const move = { previousIndex: 8, currentIndex: 5 };
      component.drop(move as any);
      expect(cardsServiceSpy.moveCard).toHaveBeenCalledWith(8, 5);
    });

    it('should sort cards', () => {
      component.sort();
      expect(cardsServiceSpy.sortHand).toHaveBeenCalled();
    });
  });
});
