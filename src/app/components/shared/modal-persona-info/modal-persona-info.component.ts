import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaService } from '../../../services/personas.service';

@Component({
  selector: 'app-modal-persona-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-persona-info.component.html',
  styleUrls: ['./modal-persona-info.component.scss']
})
export class ModalPersonaInfoComponent implements OnInit {
  persona: any;
  recomendacion: any; // <-- NUEVO

  constructor(
    private personaServices: PersonaService,
    private dialogRef: MatDialogRef<ModalPersonaInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.persona = this.personaServices.getPersonaSeleccionada();
    const resultadoModelo = this.personaServices.getRecomendacion();
  
    if (resultadoModelo) {
      this.persona.recomendacion = resultadoModelo.recomendacion;
      this.persona.resultado = resultadoModelo.resultado;
    }
  
    console.log("Persona:", this.persona);
    console.log("Resultado:", this.persona.resultado);
    console.log("Recomendación:", this.persona.recomendacion);
  }
  

 
  cerrar() {
    this.dialogRef.close();
  }
}
