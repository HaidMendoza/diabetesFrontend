import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona, resultadoModelo } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  //este es el enpoint donde esta la logica para predecir  y obtner el resultado de la openAi|
  private apiUrl = 'http://localhost:8080/api/persona/predecir';
  //esten es el enpoint para obtner los resuktados de las
  private apiUrlGet = 'http://localhost:8080/api/persona/historial';
  //este es el enpoint para eliminar todos los campos
   private apiDelete = 'http://localhost:8080/api/persona/eliminar';
   //variable para obetner los datos y abrir la modal
   private personaSeleccionada:any = "";
   private recomendacion:any="";


  constructor(private http: HttpClient) {}

  //este metodo es el que envia los datos y recibe todo incluso lo de la ia
  predecir(persona: Persona): Observable<resultadoModelo> {
    return this.http.post<resultadoModelo>(this.apiUrl, persona);
  }

  // Obtiene el historial desde el back end
  Historial(): Observable<resultadoModelo[]> {
    return this.http.get<resultadoModelo[]>(this.apiUrlGet);
  }

  //este servicio es para limpiar todos los campos
  Eliminar(): Observable<any> {
    return this.http.delete<any>(this.apiDelete);
  }

  setPersonaSeleccionada(Persona: Persona) {
    this.personaSeleccionada = Persona;  // Asignar la persona a la variable
  }
  getPersonaSeleccionada(): any{
    return this.personaSeleccionada;
  }

  setRecomendacion(Recomendación: resultadoModelo):any{
    this.recomendacion = Recomendación;

  }
  getRecomendacion():any{
    return this.recomendacion;
  }

  
}
