import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { SidevarComponent } from "./components/sidevar/sidevar.component";
import { AlgoritmoComponent } from './components/algoritmo/algoritmo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidevarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diabetesFrontend';
}
