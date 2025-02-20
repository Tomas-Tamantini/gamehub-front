import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsListComponent } from './rooms-list.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpService } from '../../../core/services/http.service';
import { of } from 'rxjs';

describe('RoomsListComponent', () => {
  let component: RoomsListComponent;
  let fixture: ComponentFixture<RoomsListComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  const mockRooms = {
    items: [
      { roomId: 1, capacity: 4, playerIds: ["Alice", "Bob"], offlinePlayers: [], isFull: false },
      { roomId: 2, capacity: 2, playerIds: ["Charlie", "David"], offlinePlayers: [], isFull: true },
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsListComponent],
      providers: [
        provideHttpClient(),
        { provide: HttpService, useValue: jasmine.createSpyObj('HttpService', ['getGameRooms']) }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomsListComponent);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    httpServiceSpy.getGameRooms.and.returnValue(of(mockRooms));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch game rooms', () => {
    expect(httpServiceSpy.getGameRooms).toHaveBeenCalled();
    expect(component.rooms()).toEqual(mockRooms.items);
  });
});
