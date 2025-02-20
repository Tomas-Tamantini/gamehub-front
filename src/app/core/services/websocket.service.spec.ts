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

  describe('send', () => {
    it('should send messages to the websocket', () => {
      service.send({ key: "value" });
      expect(mockWebSocket.send).toHaveBeenCalledWith('{"key":"value"}');
    });

    it('should convert sent messages to snake case', () => {
      service.send({ keyCamel: "value" });
      expect(mockWebSocket.send).toHaveBeenCalledWith('{"key_camel":"value"}');
    });
  });

  describe('receive', () => {
    const messageCallback = jasmine.createSpy();

    beforeEach(() => {
      service.subscribeOnMessage(messageCallback);
    });

    it('should invoke message callback on message event', () => {
      const message = new MessageEvent("message", { data: '{"key": "value"}' });
      mockWebSocket.onmessage!(message);
      expect(messageCallback).toHaveBeenCalledWith({ key: "value" });
    })

    it('should convert incoming messages to camel case', () => {
      const message = new MessageEvent("message", { data: '{"key_snake": "value"}' });
      mockWebSocket.onmessage!(message);
      expect(messageCallback).toHaveBeenCalledWith({ keySnake: "value" });
    });
  });

  it('should disconnect the websocket', () => {
    service.disconnect();
    expect(mockWebSocket.close).toHaveBeenCalled();
  });

  it('should invoke error callback on error event', () => {
    const errorCallback = jasmine.createSpy();
    service.subcribeOnError(errorCallback);
    const error = new Event("error");
    mockWebSocket.onerror!(error);
    expect(errorCallback).toHaveBeenCalledWith(error);
  })
});
