import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/personas.service';
import { Persona } from '../../models/persona';
import { ResultadoPrediccion } from '../../models/persona';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  formulario!: FormGroup;
  resultadoModelo: string = '';
  historial: ResultadoPrediccion[] = [];
  mostrarAlerta: boolean = false;

  constructor(private fb: FormBuilder, private personaServices: PersonaService) {}

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

      this.personaServices.predecir(datos).subscribe({
        next: (respuesta) => {
          this.resultadoModelo = respuesta;
          this.mostrarAlerta = true;
          this.obtenerHistorial();

          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error al predecir:', error);
          alert('Ocurrió un error al predecir. Revisa la consola.');
        }
      });
    } else {
      this.resultadoModelo = '';
      this.formulario.markAllAsTouched();
      alert('Formulario inválido. Por favor, completa todos los campos correctamente.');
    }
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
}
