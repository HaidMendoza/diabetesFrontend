import { Component } from '@angular/core';
import { CargaService } from '../../services/carga.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  constructor(public cargaService: CargaService) {}

  // Método para iniciar una carga en situaciones específicas
  iniciarCarga() {
    this.cargaService.mostrarCarga();  // Muestra el indicador de carga

    // Aquí simulas que algo que tarda en completarse está ocurriendo
    setTimeout(() => {
      // Después de realizar una acción (simulada con setTimeout), ocultamos la carga
      this.cargaService.ocultarCarga();  // Oculta el indicador de carga
    }, 3000);  // La carga se oculta después de 3 segundos (simulando un proceso)
  }
}
