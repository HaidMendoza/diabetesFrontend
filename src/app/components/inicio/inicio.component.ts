import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/personas.service';
import { Persona, resultadoModelo } from '../../models/persona';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDiabetesComponent } from '../shared/modal-diabetes/modal-diabetes.component';
import { ChangeDetectorRef } from '@angular/core';
import { CargaService } from '../../services/carga.service';
import { NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalPersonaInfoComponent } from '../shared/modal-persona-info/modal-persona-info.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  // Variables
  historial: resultadoModelo[] = [];
  nombreBuscado: FormControl = new FormControl('');
  recomendacion!: any;
  mostrarAlerta: boolean = false;
  toastMessage: string = '';
  dialogRef: any;

  constructor(
    private personaServices: PersonaService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    public cargaService: CargaService
  ) {}

  ngOnInit(): void {
    this.obtenerHistorial();
    this.nombreBuscado.valueChanges.subscribe(() => {
      this.cdRef.detectChanges();
    });
  }

  // Métodos de manejo de historial
  obtenerHistorial() {
    this.cargaService.mostrarCarga();  // Mostrar carga al empezar la operación
    this.personaServices.Historial().subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (error) => {
        console.error('Error al obtener historial:', error);
      },
      complete: () => {
        this.cargaService.ocultarCarga();  // Ocultar carga después de completar
      }
    });
  }

  get historialFiltrado() {
    const nombreBuscadoLower = this.nombreBuscado.value.toLowerCase();
    return this.historial.filter(item =>
      item.persona.nombre.toLowerCase().includes(nombreBuscadoLower)
    );
  }

  // Métodos de manejo de modales
  AbrirModal() {
    const dialogRef = this.dialog.open(ModalDiabetesComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerHistorial();
    });
  }

  SeleccionarPersonas(Persona: Persona) {
    this.personaServices.setPersonaSeleccionada(Persona);
    const dialogRef = this.dialog.open(ModalPersonaInfoComponent, {
      disableClose: false,
      panelClass: 'custom-modal-panel',
      backdropClass: 'custom-backdrop'
    });
    this.enviarRecomendacion(this.recomendacion);
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  // Métodos de acción
  Agregar() {
    this.AbrirModal();
  }

  Eliminar() {
    this.mostrarAlerta = true;
  }

  ConfirmarEliminar() {
    this.mostrarAlerta = false;
    this.cargaService.mostrarCarga();  // Mostrar carga mientras eliminamos el historial
    this.personaServices.Eliminar().subscribe({
      next: (response) => {
        console.log('Historial eliminado con éxito:', response);
        alert('🧹 Todos los campos han sido limpiados correctamente');
        this.obtenerHistorial();  // Recargar historial después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar historial:', error);
      },
      complete: () => {
        this.cargaService.ocultarCarga();  // Ocultar carga después de completar la operación
      }
    });
  }

  Actualizar() {
    console.log('Actualizar presionado');
  }

  // Métodos de notificación
  showToast() {
    this.toastMessage = 'Persona añadida correctamente!';
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  agregarPersona(persona: Persona) {
    this.cargaService.mostrarCarga();  // Mostrar carga mientras procesamos
    this.personaServices.predecir(persona).subscribe({
      next: (response) => {
        console.log('Persona añadida correctamente:', response);
        this.obtenerHistorial();
        this.showToast();  // Llamar al toast para mostrar la notificación
      },
      error: (error) => {
        console.error('Error al añadir persona:', error);
      },
      complete: () => {
        this.cargaService.ocultarCarga();  // Ocultar carga después de completar
      }
    });
  }

  // Otros métodos
  enviarRecomendacion(recomendacion: any) {
    console.log(recomendacion);
  }

  cancelarEliminacion() {
    this.mostrarAlerta = false;
  }
}
