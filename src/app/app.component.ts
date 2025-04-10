import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { SidevarComponent } from "./components/sidevar/sidevar.component";

@Component({
  selector: 'app-root',
  imports: [InicioComponent, RouterOutlet, SidevarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diabetesFrontend';
}
