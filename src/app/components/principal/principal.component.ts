import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Necesario para navegación
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  constructor(private router: Router) {}

  irAInformacion(): void {
    this.router.navigate(['/informacion']); 
  }

  irAPrediccion(): void {
    this.router.navigate(['/prediccion']);
  }
}
