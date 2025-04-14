import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CargaService } from '../../services/carga.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidevar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.scss']
})
export class SidevarComponent implements OnInit {
  isExpanded = true; // Sidebar comenzará expandido
  estaCargando$!: Observable<boolean>; // Declaramos como Observable, no inicializamos directamente aquí

  constructor(private cargaService: CargaService) {}

  ngOnInit(): void {
    this.estaCargando$ = this.cargaService.estaCargando$; // Asignamos en ngOnInit para evitar el error
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  simularCarga() {
    // Activar carga
    this.cargaService.mostrarCarga();

    // Simulamos una acción con un setTimeout, como si fuera una petición HTTP
    setTimeout(() => {
      // Acción completada, ocultamos la carga
      this.cargaService.ocultarCarga();
    }, 3000); // Por ejemplo, espera 3 segundos para ocultar la carga
  }
}
