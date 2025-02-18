import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-menu',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss'
})
export class AccountMenuComponent {
  private readonly userService = inject(UserService);

  playerId(): string {
    return this.userService.getPlayerId();
  }
}
