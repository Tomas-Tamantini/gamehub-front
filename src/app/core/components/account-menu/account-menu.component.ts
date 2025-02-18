import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-account-menu',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss'
})
export class AccountMenuComponent {
  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog)

  playerId(): string {
    return this.userService.getPlayerId();
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
    dialogRef.afterClosed().subscribe(playerId => {
      if (playerId) {
        this.userService.login(playerId);
      }
    });
  }
}
