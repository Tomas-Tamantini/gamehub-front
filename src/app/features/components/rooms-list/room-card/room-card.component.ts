import { Component, inject, input } from '@angular/core';
import { RoomSummary } from '../../../../core/models/room-summary.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MoneyPipe } from '../../../../core/pipes/money.pipe';

@Component({
  selector: 'app-room-card',
  imports: [MatCardModule, MatButtonModule, MoneyPipe],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {
  room = input.required<RoomSummary>();
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  canRejoin() {
    return this.room().offlinePlayers.includes(this.authService.getPlayerId());
  }

  canJoin() {
    return !this.room().isFull;
  }

  enterRoom(action: 'join' | 'watch' | 'rejoin') {
    this.router.navigate(['/room', this.room().roomId], { queryParams: { action } });
  }
}
