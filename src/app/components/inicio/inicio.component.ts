import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/personas.service';
import { Persona, resultadoModelo } from '../../models/persona';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDiabetesComponent } from '../shared/modal-diabetes/modal-diabetes.component';
import { ChangeDetectorRef } from '@angular/core';
import { CargaService } from '../../services/carga.service';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms'; // Importamos FormControl
import { ReactiveFormsModule } from '@angular/forms';
import { ModalPersonaInfoComponent } from '../shared/modal-persona-info/modal-persona-info.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatDialogModule,ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  historial: resultadoModelo[] = [];
  dialogRef: any;
  nombreBuscado: FormControl = new FormControl('');  // Usamos FormControl para el campo de búsqueda
  recomendacion!:any;

  constructor(
    private personaServices: PersonaService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    public cargaService: CargaService
  ) {}

  ngOnInit(): void {
    this.obtenerHistorial();

    // Suscribirse a los cambios del FormControl para filtrar automáticamente
    this.nombreBuscado.valueChanges.subscribe(() => {
      this.cdRef.detectChanges(); // Actualiza la vista
    });
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
      next: (response) => {
        console.log('Respuesta del backend:', response); // Verificar la respuesta
        alert("🧹 Todos los campos han sido limpiados correctamente");
        this.obtenerHistorial(); // Recargar la tabla después de la eliminación
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

  // Método para filtrar por nombre
  get historialFiltrado() {
    const nombreBuscadoLower = this.nombreBuscado.value.toLowerCase();  // Convertir a minúsculas para una comparación no sensible a mayúsculas
    return this.historial.filter(item =>
      item.persona.nombre.toLowerCase().includes(nombreBuscadoLower)
    );
  }

  cerrarModal(): void {
    this.dialogRef.close(); // Cierra el modal
  }

  //metodo para abrir la modal con la infromacion del paciente
  SeleccionarPersonas(Persona:Persona){
    this.personaServices.setPersonaSeleccionada(Persona);
    const dialogRef = this.dialog.open(ModalPersonaInfoComponent,
       {disableClose: false,
        panelClass: 'custom-modal-panel',
        backdropClass: 'custom-backdrop'
    
    });
    this.enviarRecomendacion(this.recomendacion);
  }
  enviarRecomendacion(recomendacion:resultadoModelo){
    this.personaServices.setRecomendacion(recomendacion)

  }
  
}
