import { Component, inject, model, OnInit } from '@angular/core';
import { RoomSummary } from './room-summary.model';
import { RoomCardComponent } from './room-card/room-card.component';
import { HttpService } from '../../../core/services/http.service';
import { CardsSkeletonComponent } from "../../../core/components/cards-skeleton/cards-skeleton.component";

@Component({
  selector: 'app-rooms-list',
  imports: [RoomCardComponent, CardsSkeletonComponent],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss'
})
export class RoomsListComponent implements OnInit {
  rooms = model<RoomSummary[]>([]);
  isLoading = model<boolean>(true);
  private readonly httpService = inject(HttpService);

  ngOnInit() {
    this.isLoading.set(true);
    this.httpService.getGameRooms().subscribe({
      next: rooms => {
        this.rooms.set(rooms.items);
        this.isLoading.set(false);
      },
      error: error => {
        console.error('Failed to fetch game rooms', error);
        this.isLoading.set(false);
      }
    });
  }
}
