import { Component, inject, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../auth/services/auth.service';
import { ScreenService } from '../../../shared/services/screen.service';
import { NotificacionService } from '../services/notificacion.service';
import { MenuItem } from '../../auth/models';
import { NotificacionesDialogComponent } from './notificaciones-dialog';

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
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {

  @Input() menuItems: MenuItem[] = [];

  readonly toggleSidebar = output<void>();

  constructor(
    readonly authService: AuthService,
    readonly screenService: ScreenService,
    private dialog: MatDialog,
    readonly notificacionService: NotificacionService
  ) {
    const userId = this.authService.currentUser()?.nameidentifier;
    if (userId) this.notificacionService.conectar(userId);
  }

  protected onAbrirNotificaciones(): void {
    this.dialog.open(NotificacionesDialogComponent, {
      width: '450px',
      maxWidth: '95vw',
    });
  }


}