import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../../services/personas.service';
import { Persona, ResultadoPrediccion } from '../../../models/persona';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-diabetes',
  templateUrl: './modal-diabetes.component.html',
  styleUrls: ['./modal-diabetes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ModalDiabetesComponent implements OnInit {
  formulario!: FormGroup;
  resultadoModelo: string = '';
  mostrarAlerta: boolean = false;
  historial: ResultadoPrediccion[] = [];

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private dialogRef: MatDialogRef<ModalDiabetesComponent>
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      embarazos: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
      glucosa: [null, [Validators.required, Validators.min(0), Validators.max(300)]],
      presionArterial: [null, [Validators.required, Validators.min(0), Validators.max(200)]],
      grosorPiel: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      insulina: [null, [Validators.required, Validators.min(0), Validators.max(900)]],
      indiceMasaCorporal: [null, [Validators.required, Validators.min(10), Validators.max(70)]],
      funcionDiabetes: [null, [Validators.required, Validators.min(0.0), Validators.max(2.5)]],
      edad: [null, [Validators.required, Validators.min(0), Validators.max(120)]]
    });

    this.obtenerHistorial();
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const datos: Persona = {
        pregnancies: this.formulario.value.embarazos,
        plasmaGlucose: this.formulario.value.glucosa,
        bloodPressure: this.formulario.value.presionArterial,
        skinThickness: this.formulario.value.grosorPiel,
        insulin: this.formulario.value.insulina,
        bmi: this.formulario.value.indiceMasaCorporal,
        diabetesPedigreeFunction: this.formulario.value.funcionDiabetes,
        age: this.formulario.value.edad
      };

      this.personaService.predecir(datos).subscribe({
        next: (respuesta) => {
          this.resultadoModelo = respuesta;
          this.mostrarAlerta = true;
          this.obtenerHistorial();
        },
        error: (error) => {
          console.error('Error al predecir:', error);
          alert('Ocurrió un error al predecir.');
        }
      });
    } else {
      this.resultadoModelo = '';
      this.formulario.markAllAsTouched();
      alert('Formulario inválido.');
    }
    this.cerrarModal()
  }

  obtenerHistorial() {
    this.personaService.Historial().subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (error) => {
        console.error('Error al obtener historial:', error);
      }
    });
  }

 
  cerrarModal(): void {
    this.dialogRef.close(); // Cierra el modal
  }
}
