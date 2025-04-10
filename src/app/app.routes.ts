import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { Component } from '@angular/core';

export const routes: Routes = [
  { path: '', component: PrincipalComponent }, 
  { path: 'pacientes', component: InicioComponent },
  { path: '**', redirectTo: '' },
  { path: 'Inicio', component: PrincipalComponent }, 

  
 
];
