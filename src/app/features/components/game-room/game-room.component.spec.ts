import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomComponent } from './game-room.component';
import { WebsocketService } from '../../../core/services/websocket.service';

describe('GameRoomComponent', () => {
  let component: GameRoomComponent;
  let fixture: ComponentFixture<GameRoomComponent>;
  let socketServiceSpy: jasmine.SpyObj<WebsocketService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRoomComponent],
      providers: [
        { provide: WebsocketService, useValue: jasmine.createSpyObj('WebsocketService', ['connect', 'disconnect']) }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameRoomComponent);
    socketServiceSpy = TestBed.inject(WebsocketService) as jasmine.SpyObj<WebsocketService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect the websocket service on init', () => {
    expect(socketServiceSpy.connect).toHaveBeenCalled();
  })

  it('should disconnect the websocket service on destroy', () => {
    component.ngOnDestroy();
    expect(socketServiceSpy.disconnect).toHaveBeenCalled();
  });
});
