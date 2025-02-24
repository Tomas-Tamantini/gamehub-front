import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  passTurn() {
    console.log("Implement passTurn");
  }

  playCards() {
    console.log("Implement playCards");
  }
}
