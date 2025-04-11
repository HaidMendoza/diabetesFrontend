import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidevar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.scss']
})
export class SidevarComponent {
  isExpanded = true; // Sidebar comenzará expandido

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
