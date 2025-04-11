import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/personas.service';
import { resultadoModelo } from '../../models/persona';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDiabetesComponent } from '../shared/modal-diabetes/modal-diabetes.component';
import { ChangeDetectorRef } from '@angular/core';
import { CargaService } from '../../services/carga.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  historial: resultadoModelo[] = [];
  dialogRef: any;

  constructor(
    private personaServices: PersonaService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    public cargaService: CargaService
  ) {}

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  obtenerHistorial() {
    this.cargaService.mostrarCarga(); // Mostrar carga
    this.personaServices.Historial().subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (error) => {
        console.error('Error al obtener historial:', error);
      },
      complete: () => {
        this.cargaService.ocultarCarga(); // Ocultar carga
      }
    });
  }

  AbrirModal() {
    const dialogRef = this.dialog.open(ModalDiabetesComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerHistorial();
    });
  }

  Agregar() {
    this.AbrirModal();
  }

  Eliminar() {
    if (!confirm('¿Estás seguro de que quieres eliminar todo el historial?')) return;

    this.cargaService.mostrarCarga(); // Mostrar carga
    this.personaServices.Eliminar().subscribe({
      next: () => {
        alert("🧹 Todos los campos han sido limpiados correctamente");
        this.obtenerHistorial(); // Recargar la tabla
      },
      error: (error) => {
        console.error('Error al eliminar historial:', error);
      },
      complete: () => {
        this.cargaService.ocultarCarga(); // Ocultar carga
      }
    });
  }

  Actualizar() {
    console.log('Actualizar presionado');
  }

  cerrarModal(): void {
    this.dialogRef.close(); // Cierra el modal
  }
}
