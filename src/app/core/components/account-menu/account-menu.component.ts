import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss'
})
export class AccountMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  playerId(): string {
    return this.authService.getPlayerId();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
