import { Component } from '@angular/core';
import { HeaderComponent } from "./core/components/header/header.component";
import { RoomsListComponent } from "./features/components/rooms-list/rooms-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RoomsListComponent]
})
export class AppComponent {
}
