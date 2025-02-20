import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSkeletonComponent } from './cards-skeleton.component';

describe('CardsSkeletonComponent', () => {
  let component: CardsSkeletonComponent;
  let fixture: ComponentFixture<CardsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
