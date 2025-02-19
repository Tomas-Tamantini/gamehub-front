import { Component, input } from '@angular/core';
import { RoomSummary } from '../rooms-list/room-summary.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {
  room = input.required<RoomSummary>();

  joinRoom() { }
}
