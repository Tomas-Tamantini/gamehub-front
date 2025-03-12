import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get game rooms from proper endpoint', () => {
    service.getGameRooms().subscribe();
    const baseUrl = environment.apiUrl;
    const expectedEndpoint = `${baseUrl}/rooms/chinese-poker`;
    const req = httpTestingController.expectOne(expectedEndpoint);
    expect(req.request.method).toBe('GET');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
