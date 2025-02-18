import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    service.logout();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set player id on login', () => {
    service.login('Alice');
    expect(service.getPlayerId()).toBe('Alice');
  });

  it('should return empty playerId if player is not logged in', () => {
    expect(service.getPlayerId()).toBe('');
  });

  it('should clear playerId on logout', () => {
    service.login('Alice');
    service.logout();
    expect(service.getPlayerId()).toBe('');
  });
});
