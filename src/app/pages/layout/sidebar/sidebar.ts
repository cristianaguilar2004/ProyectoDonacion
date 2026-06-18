import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  protected readonly authService = inject(AuthService);
  readonly close = output<void>();

  protected readonly menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'home', route: '/home' },
    {
      label: 'Donaciones',
      icon: 'volunteer_activism',
      children: [
        { label: 'Nueva Donación', icon: 'add_circle', route: '/donaciones/nueva' },
        { label: 'Mis Donaciones', icon: 'list_alt', route: '/donaciones/mis-donaciones' },
      ],
    },
    {
      label: 'Campañas',
      icon: 'campaign',
      children: [
        { label: 'Ver Campañas', icon: 'visibility', route: '/campanas' },
        { label: 'Crear Campaña', icon: 'add', route: '/campanas/crear' },
      ],
    },
    { label: 'Reportes', icon: 'bar_chart', route: '/reportes' },
  ];
}