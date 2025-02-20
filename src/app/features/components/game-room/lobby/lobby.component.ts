import { Component, computed, input } from '@angular/core';
import { RoomSummary } from '../../../../core/models/room-summary.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lobby',
  imports: [MatCardModule, MatListModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {
  room = input.required<RoomSummary>();

  numOpenSeats = computed(() => {
    return this.room().capacity - this.room().playerIds.length;
  });
}
