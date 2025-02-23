import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hand',
  imports: [],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.scss'
})
export class HandComponent {
  numCards = input.required<number>();
}
