import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private snackbar = inject(MatSnackBar);

  alertError(message: string, debugMsg?: string) {
    this.snackbar.open(`Error: ${message}`, 'OK', {
      duration: 5000
    });
    if (debugMsg) {
      console.error(debugMsg);
    }
  }

  alertWarning(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: 5000
    });
  }
}
