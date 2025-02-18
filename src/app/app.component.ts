import { Component } from '@angular/core';
import { HeaderComponent } from "./core/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent]
})
export class AppComponent {
}
