import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../auth/services/auth.service';
import { ScreenService } from '../../../shared/services/screen.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  protected readonly authService = inject(AuthService);
  protected readonly screenService = inject(ScreenService);

  readonly toggleSidebar = output<void>();

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