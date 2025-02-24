import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandHistoryComponent } from './hand-history.component';

describe('HandHistoryComponent', () => {
  let component: HandHistoryComponent;
  let fixture: ComponentFixture<HandHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
