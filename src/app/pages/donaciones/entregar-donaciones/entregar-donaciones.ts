import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card';
import { SolicitudService } from '../services/solicitud.service';
import { SucursalService } from '../../configuraciones/services/sucursal.service';
import { Solicitud } from '../models';
import { Sucursal } from '../../configuraciones/models';
import { EntregarDetalleComponent } from './entregar-detalle';
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
    selector: 'app-entregar-donaciones',
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        FormsModule,
        CardComponent,
    ],
    templateUrl: './entregar-donaciones.html',
    styleUrl: './entregar-donaciones.css',
})
export class EntregarDonaciones implements OnInit {
    protected solicitudes: Solicitud[] = [];
    protected filteredSolicitudes: Solicitud[] = [];
    protected sucursales: Sucursal[] = [];
    protected selectedSucursalId = '';
    protected displayedColumns: string[] = ['solicitante', 'articulo', 'sucursal', 'fechaAceptada', 'acciones'];
    protected isLoading = signal(false);

    constructor(
        private solicitudService: SolicitudService,
        private sucursalService: SucursalService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.onCargarDatos();
    }

    onCargarDatos(): void {
        this.isLoading.set(true);
        Alerts.Loading('Cargando solicitudes aceptadas...');

        Promise.all([
            this.solicitudService.getSolicitudesAceptadas(),
            this.sucursalService.getSucursales(true),
        ])
            .then(([solicitudesRes, sucursalesRes]) => {
                this.solicitudes = solicitudesRes.data;
                this.sucursales = sucursalesRes.data;
                this.onFiltrar();
                Alerts.Close();
            })
            .catch(() => {
                Alerts.Close();
                Alerts.Error('Error al cargar datos');
            })
            .finally(() => {
                this.isLoading.set(false);
            });
    }

    onFiltrar(): void {
        if (!this.selectedSucursalId) {
            this.filteredSolicitudes = [...this.solicitudes];
        } else {
            this.filteredSolicitudes = this.solicitudes.filter(
                s => s.donacion?.sucursalId === this.selectedSucursalId
            );
        }
    }

    onVerDetalle(solicitud: Solicitud): void {
        const dialogRef = this.dialog.open(EntregarDetalleComponent, {
            width: '550px',
            maxWidth: '95vw',
            data: solicitud,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'entregado') {
                this.onCargarDatos();
            }
        });
    }
}
