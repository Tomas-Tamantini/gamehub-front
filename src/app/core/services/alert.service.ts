import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertError(message: string, debugMsg?: string) {
    alert(`Error: ${message}`);
    if (debugMsg) {
      console.error(debugMsg);
    }
  }
}
