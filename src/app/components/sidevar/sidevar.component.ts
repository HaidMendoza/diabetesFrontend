import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  isExpanded: boolean = true; // Sidebar comenzará expandido
  estaCargando$!: Observable<boolean>; // Observable para la animación de carga

  constructor(private cargaService: CargaService) {}

  ngOnInit(): void {
    // Asignamos el observable del servicio en OnInit
    this.estaCargando$ = this.cargaService.estaCargando$;
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  simularCarga(): void {
    this.cargaService.mostrarCarga();

    // Simula una acción como una petición HTTP
    setTimeout(() => {
      this.cargaService.ocultarCarga();
    }, 3000);
  }
}
