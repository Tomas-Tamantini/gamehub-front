import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomSummary } from '../../features/components/rooms-list/room-summary.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ListResponse } from '../models/list-response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  public getGameRooms(): Observable<ListResponse<RoomSummary>> {
    const queryParams = new URLSearchParams({ game_type: 'chinese_poker' });
    return this.http.get<ListResponse<RoomSummary>>(`${environment.apiUrl}/rooms/?${queryParams.toString()}`);
  }
}
