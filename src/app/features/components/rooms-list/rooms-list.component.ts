import { Component, model } from '@angular/core';
import { RoomSummary } from './room-summary.model';
import { RoomCardComponent } from './room-card/room-card.component';

const mockRoomsData: RoomSummary[] = [
  { roomId: 1, capacity: 4, playerIds: ["Alice", "Bob"], offlinePlayers: [], isFull: false },
  { roomId: 2, capacity: 4, playerIds: ["Charlie", "David", "Esther", "Frida"], offlinePlayers: ["Frida"], isFull: true }
]

@Component({
  selector: 'app-rooms-list',
  imports: [RoomCardComponent],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss'
})
export class RoomsListComponent {
  rooms = model<RoomSummary[]>(mockRoomsData);
}
