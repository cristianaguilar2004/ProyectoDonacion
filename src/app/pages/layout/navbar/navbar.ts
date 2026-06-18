import { Component, inject, Input, input, output } from '@angular/core';
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
import { MenuItem } from '../../auth/models';

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

  @Input() menuItems: MenuItem[] = [];

  readonly toggleSidebar = output<void>();

  constructor(readonly authService: AuthService, readonly screenService: ScreenService) { 
    console.log('NavbarComponent initialized with menuItems:', this.menuItems);
  }
}