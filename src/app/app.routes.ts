import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent }, 
  { path: 'prediccion', component: InicioComponent },
  { path: '**', redirectTo: '' } 
];
