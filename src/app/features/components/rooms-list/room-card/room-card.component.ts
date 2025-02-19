import { Component, inject, input } from '@angular/core';
import { RoomSummary } from '../room-summary.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {
  room = input.required<RoomSummary>();
  private readonly router = inject(Router);

  canJoin() {
    return !this.room().isFull;
  }

  joinRoom() {
    this.router.navigate(['/room', this.room().roomId], { queryParams: { action: 'join' } });
  }
}
