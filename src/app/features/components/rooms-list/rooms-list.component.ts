import { Component, inject, model, OnInit } from '@angular/core';
import { RoomSummary } from '../../../core/models/room-summary.model';
import { RoomCardComponent } from './room-card/room-card.component';
import { HttpService } from '../../../core/services/http.service';
import { CardsSkeletonComponent } from "../../../core/components/cards-skeleton/cards-skeleton.component";
import { AlertService } from '../../../core/services/alert.service';

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
  private readonly alertService = inject(AlertService);

  ngOnInit() {
    this.isLoading.set(true);
    this.httpService.getGameRooms().subscribe({
      next: rooms => {
        this.rooms.set(rooms.items);
        this.isLoading.set(false);
      },
      error: error => {
        this.alertService.alertError('Could not get game rooms', error);
        this.isLoading.set(false);
      }
    });
  }
}
