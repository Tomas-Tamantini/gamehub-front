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
    } as any;
    globalThis.WebSocket = jasmine.createSpy().and.returnValue(mockWebSocket) as any;
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to the websocket in the proper URL', () => {
    service.connect();
    const expectedEndpoint = `${environment.apiUrl}/ws`;
    expect(globalThis.WebSocket).toHaveBeenCalledWith(expectedEndpoint);
  });

  it('should disconnect the websocket', () => {
    service.disconnect();
    expect(mockWebSocket.close).toHaveBeenCalled();
  });
});
