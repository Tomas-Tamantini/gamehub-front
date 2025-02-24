import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandHistoryComponent } from './hand-history.component';
import { ComponentRef } from '@angular/core';

describe('HandHistoryComponent', () => {
  let component: HandHistoryComponent;
  let componentRef: ComponentRef<HandHistoryComponent>;
  let fixture: ComponentFixture<HandHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandHistoryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HandHistoryComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('history', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return last hand', () => {
    expect(component.lastHand()).toBeUndefined();
    const mockHand = { cards: [], isHandToBeat: false };
    componentRef.setInput('history', [mockHand]);
    expect(component.lastHand()).toEqual(mockHand);
  })

  it('should return hand before last', () => {
    expect(component.handBeforeLast()).toBeUndefined();
    const mockHandA = { cards: [], isHandToBeat: false };
    const mockHandB = { cards: [], isHandToBeat: true };
    componentRef.setInput('history', [mockHandA, mockHandB]);
    expect(component.handBeforeLast()).toEqual(mockHandA);
  });
});
