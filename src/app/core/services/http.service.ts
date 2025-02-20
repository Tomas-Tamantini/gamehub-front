import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomSummary } from '../../features/components/rooms-list/room-summary.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  public getGameRooms(): Observable<RoomSummary[]> {
    const queryParams = new URLSearchParams({ game_type: 'chinese_poker' });
    return this.http.get<RoomSummary[]>(`${environment.apiUrl}/rooms?${queryParams.toString()}`);
  }
}
