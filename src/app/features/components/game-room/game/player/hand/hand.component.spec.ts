import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandComponent } from './hand.component';
import { ComponentRef } from '@angular/core';

describe('HandComponent', () => {
  let component: HandComponent;
  let componentRef: ComponentRef<HandComponent>;
  let fixture: ComponentFixture<HandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HandComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('numCards', 5);
    componentRef.setInput('cards', undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
