import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-account-menu',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss'
})
export class AccountMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog)

  playerId(): string {
    return this.authService.getPlayerId();
  }

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
    dialogRef.afterClosed().subscribe(playerId => {
      if (playerId) {
        this.authService.login(playerId);
      }
    });
  }
}
