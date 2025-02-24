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
        { provide: CardsService, useValue: jasmine.createSpyObj('CardsService', ['toggleSelection', 'selectedCards']) },
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
});
