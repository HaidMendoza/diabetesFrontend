import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/personas.service';
import { ResultadoPrediccion } from '../../models/persona';
import { MatDialog, MatDialogModule, } from '@angular/material/dialog';
import { ModalDiabetesComponent } from '../shared/modal-diabetes/modal-diabetes.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  historial: ResultadoPrediccion[] = [];
  dialogRef: any;

  constructor(private personaServices: PersonaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  obtenerHistorial() {
    this.personaServices.Historial().subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (error) => {
        console.error('Error al obtener historial:', error);
      }
    });
  }

  AbrirModal() {
    const dialogRef = this.dialog.open(ModalDiabetesComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerHistorial(); // Actualizar historial al cerrar la modal
    });
  }

  Agregar() {
    this.AbrirModal();
  }

  Eliminar() {
    console.log('Eliminar presionado');
  }

  Actualizar() {
    console.log('Actualizar presionado');
  }
  cerrarModal(): void {
    this.dialogRef.close(); // Cierra el modal
  }
  
}
