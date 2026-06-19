import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardComponent } from '../../../shared/components/card/card';
import { DonacionService } from '../services/donacion.service';
import { Donacion } from '../models';
import { MisDonacionesDetalleComponent } from './mis-donaciones-detalle';
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
  selector: 'app-mis-donaciones',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CardComponent,
  ],
  templateUrl: './mis-donaciones.html',
  styleUrl: './mis-donaciones.css',
})
export class MisDonaciones implements OnInit {
  protected dataSource: Donacion[] = [];
  protected displayedColumns: string[] = ['nombre', 'categoria', 'estadoDonacion', 'fecha', 'acciones'];
  protected isLoading = signal(false);

  constructor(
    private donacionService: DonacionService,
    private dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {
    this.onCargarDatos();
  }

  onCargarDatos(): void {
    this.isLoading.set(true);
    Alerts.Loading('Cargando donaciones...');

    this.donacionService.getMisDonaciones()
      .then(response => {
        this.dataSource = response.data;
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
    const dialogRef = this.dialog.open(MisDonacionesDetalleComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: donacion,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'aceptado') {
        this.onCargarDatos();
      }
    });
  }
}
