import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly playerIdKey = 'gamehubPlayerId';

  getPlayerId(): string {
    return localStorage.getItem(this.playerIdKey) || '';
  }

  login(playerId: string): void {
    localStorage.setItem(this.playerIdKey, playerId);
  }

  logout(): void {
    localStorage.removeItem(this.playerIdKey);
  }
}
