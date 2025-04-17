import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidevarComponent } from "./components/sidevar/sidevar.component";
import { CargaService } from './services/carga.service';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidevarComponent, NgIf, AsyncPipe], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diabetesFrontend';

  constructor(public cargaService: CargaService) {}
  
  get estaCargando$() {
    return this.cargaService.estaCargando$;
  }
}

