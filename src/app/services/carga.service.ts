import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaService {
  public estaCargandoSubject = new BehaviorSubject<boolean>(false);
  public estaCargando$ = this.estaCargandoSubject.asObservable();

  mostrarCarga() {
    this.estaCargandoSubject.next(true);
  }

  ocultarCarga() {
    this.estaCargandoSubject.next(false);
  }
}
