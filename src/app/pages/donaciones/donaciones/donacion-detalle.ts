import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Donacion } from '../models';
import { SolicitudService } from '../services/solicitud.service';
import { DonacionService } from '../services/donacion.service';
import { AuthService } from '../../auth/services/auth.service';
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
    selector: 'app-donacion-detalle',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <mat-dialog-content class="p-0">
            @if (data.urlImagen) {
            <div class="detalle-imagen">
                <img [src]="data.urlImagen" [alt]="data.nombreArticulo" />
            </div>
            }

            <div class="p-4">
                <h3 class="fw-bold mb-1">{{ data.nombreArticulo }}</h3>
                <p class="text-muted small mb-3">Publicado {{ data.fechaCreacion | date:'mediumDate' }}</p>

                <p class="mb-3">{{ data.descripcionArticulo }}</p>

                <div class="row g-3 mb-3">
                    <div class="col-6">
                        <small class="text-muted d-block">Categoría</small>
                        <span class="fw-medium">{{ data.categoria?.nombre ?? '—' }}</span>
                    </div>
                    <div class="col-6">
                        <small class="text-muted d-block">Sucursal</small>
                        <span class="fw-medium">{{ data.sucursal?.nombre ?? '—' }}</span>
                    </div>
                    <div class="col-6">
                        <small class="text-muted d-block">Estado del artículo</small>
                        <span class="fw-medium">{{ data.estadoArticulo?.descripcion ?? '—' }}</span>
                    </div>
                    <div class="col-6">
                        <small class="text-muted d-block">Estado de donación</small>
                        <span class="fw-medium">{{ data.estadoDonacion?.descripcion ?? '—' }}</span>
                    </div>
                </div>
            </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end" class="px-4 pb-3 d-flex justify-content-between">
            <div>
                @if (isAdmin) {
                <button mat-stroked-button color="warn" (click)="onDesactivar()" [disabled]="desactivando()">
                    @if (desactivando()) {
                    <mat-spinner diameter="18" class="d-inline-block me-1"></mat-spinner>
                    Desactivando...
                    } @else {
                    <ng-container>
                        <mat-icon>toggle_off</mat-icon>
                        Desactivar
                    </ng-container>
                    }
                </button>
                }
            </div>
            <div class="d-flex gap-2">
                <button mat-button (click)="onClose()">
                    <mat-icon>close</mat-icon>
                    Cerrar
                </button>
                <button mat-flat-button color="primary" (click)="onSolicitar()" [disabled]="solicitando()">
                    @if (solicitando()) {
                    <mat-spinner diameter="18" class="d-inline-block me-1"></mat-spinner>
                    Solicitando...
                    } @else {
                    <ng-container>
                        <mat-icon>handshake</mat-icon>
                        Solicitar Donación
                    </ng-container>
                    }
                </button>
            </div>
        </mat-dialog-actions>
    `,
    styles: `
        .detalle-imagen {
            width: 100%;
            max-height: 300px;
            overflow: hidden;
            background: #f5f5f5;
            border-radius: 4px 4px 0 0;
        }
        .detalle-imagen img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `
})
export class DonacionDetalleComponent {
    protected solicitando = signal(false);
    protected desactivando = signal(false);
    protected isAdmin = false;

    constructor(
        public dialogRef: MatDialogRef<DonacionDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Donacion,
        private solicitudService: SolicitudService,
        private donacionService: DonacionService,
        private authService: AuthService
    ) {
        this.isAdmin = this.authService.currentUser()?.role === 'admin';
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onSolicitar(): void {
        this.solicitando.set(true);
        Alerts.Loading('Enviando solicitud...');

        this.solicitudService.postSolicitudes(this.data.id)
            .then(() => {
                Alerts.Success('Solicitud enviada exitosamente');
                this.dialogRef.close('solicitado');
            })
            .catch((error) => {
                this.dialogRef.close('solicitado');
                Alerts.Error(error?.error?.message || 'Error al enviar la solicitud');
            })
            .finally(() => {
                this.solicitando.set(false);
            });
    }

    onDesactivar(): void {
        this.desactivando.set(true);
        Alerts.Loading('Desactivando donación...');
        this.dialogRef.disableClose = true;

        this.donacionService.patchDesactivarDonacion(this.data.id)
            .then((response) => {
                this.dialogRef.close('desactivado');
                Alerts.Success(response.message || 'Donación desactivada');
            })
            .catch((error) => {
                Alerts.Close();
                Alerts.Error(error?.error?.message || 'Error al desactivar');
            })
            .finally(() => {
                this.desactivando.set(false);
                this.dialogRef.disableClose = false;
            });
    }
}