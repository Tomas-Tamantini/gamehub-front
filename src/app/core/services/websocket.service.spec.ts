import { TestBed } from '@angular/core/testing';

import { WebsocketService } from './websocket.service';
import { environment } from '../../../environments/environment';

describe('WebsocketService', () => {
  let service: WebsocketService;
  let mockWebSocket: jasmine.SpyObj<WebSocket>;

  beforeEach(() => {
    mockWebSocket = {
      onmessage: jasmine.createSpy(),
      send: jasmine.createSpy(),
      close: jasmine.createSpy()
    } as any;
    globalThis.WebSocket = jasmine.createSpy().and.returnValue(mockWebSocket) as any;
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
    service.connect("Alice");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to the websocket in the proper URL', () => {
    expect(globalThis.WebSocket).toHaveBeenCalledWith(`${environment.apiUrl}/ws?player_id=Alice`);
  });

  it('should disconnect the websocket', () => {
    service.disconnect();
    expect(mockWebSocket.close).toHaveBeenCalled();
  });

  it('should invoke error callback on error', () => {
    const errorCallback = jasmine.createSpy();
    service.subcribeOnError(errorCallback);
    const error = new Event("error");
    mockWebSocket.onerror!(error);
    expect(errorCallback).toHaveBeenCalledWith(error);
  })
});
