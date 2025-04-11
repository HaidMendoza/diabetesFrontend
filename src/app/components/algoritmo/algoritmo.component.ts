import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Necesario para navegación

@Component({
  selector: 'app-algoritmo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './algoritmo.component.html',
  styleUrls: ['./algoritmo.component.scss']
})
export class AlgoritmoComponent {

}
