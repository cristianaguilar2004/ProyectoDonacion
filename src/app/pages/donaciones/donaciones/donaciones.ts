import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DonacionService } from '../services/donacion.service';
import { Donacion } from '../models';
import { DonacionDetalleComponent } from './donacion-detalle';
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
  selector: 'app-donaciones',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './donaciones.html',
  styleUrl: './donaciones.css',
})
export class Donaciones implements OnInit {
  protected donaciones: Donacion[] = [];
  protected isLoading = signal(false);

  constructor(
    private donacionService: DonacionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onCargarDatos();
  }

  onCargarDatos(): void {
    this.isLoading.set(true);
    Alerts.Loading('Cargando donaciones...');

    this.donacionService.getDonacionesDisponibles()
      .then(response => {
        this.donaciones = response.data;
        Alerts.Close();
      })
      .catch(() => {
        Alerts.Close();
        Alerts.Error('Error al cargar donaciones');
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  onVerDetalle(donacion: Donacion): void {
    const dialogRef = this.dialog.open(DonacionDetalleComponent, {
      width: '550px',
      maxWidth: '95vw',
      data: donacion,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'desactivado') {
        this.onCargarDatos();
      }
    });
  }
}
