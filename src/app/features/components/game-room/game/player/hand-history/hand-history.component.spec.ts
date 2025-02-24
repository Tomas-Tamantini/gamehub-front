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
});
