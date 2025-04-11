import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AlgoritmoComponent } from './components/algoritmo/algoritmo.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'inicio', component: PrincipalComponent },
  { path: 'pacientes', component: InicioComponent },
  { path: 'algoritmo', component: AlgoritmoComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: '**', redirectTo: '' },
];
