import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";

@Component({
  selector: 'app-root',
  imports: [InicioComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diabetesFrontend';
}
