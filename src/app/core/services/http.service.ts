import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomSummary } from '../models/room-summary.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ListResponse } from '../models/list-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  public getGameRooms(): Observable<ListResponse<RoomSummary>> {
    return this.http.get<ListResponse<RoomSummary>>(`${environment.apiUrl}/rooms/chinese-poker`);
  }
}
