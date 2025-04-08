import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { ResultadoPrediccion } from '../models/persona';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'http://localhost:8080/api/persona/predecir';
  private apiUrlGet = 'http://localhost:8080/api/persona/historial';

  constructor(private http: HttpClient) {}

  predecir(persona: Persona): Observable<string> {
    return this.http.post(this.apiUrl, persona, { responseType: 'text' });
  }

  Historial(): Observable<ResultadoPrediccion[]> {
    return this.http.get<ResultadoPrediccion[]>(this.apiUrlGet);
  }
}
