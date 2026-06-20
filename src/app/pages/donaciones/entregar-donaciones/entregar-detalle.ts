import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Solicitud } from '../models';
import { SolicitudService } from '../services/solicitud.service';
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
    selector: 'app-entregar-detalle',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <mat-dialog-content class="p-4">
            <h3 class="fw-bold mb-1">{{ data.donacion?.nombreArticulo ?? '—' }}</h3>
            <p class="text-muted small mb-3">
                Donación de {{ data.solicitante?.nombre ?? '—' }} — {{ data.fechaAceptada | date:'mediumDate' }}
            </p>

            <p class="mb-3">{{ data.donacion?.descripcionArticulo }}</p>

            <div class="row g-3 mb-3">
                <div class="col-6">
                    <small class="text-muted d-block">Categoría</small>
                    <span class="fw-medium">{{ data.donacion?.categoria?.nombre ?? '—' }}</span>
                </div>
                <div class="col-6">
                    <small class="text-muted d-block">Sucursal</small>
                    <span class="fw-medium">{{ data.donacion?.sucursal?.nombre ?? '—' }}</span>
                </div>
                <div class="col-6">
                    <small class="text-muted d-block">Estado artículo</small>
                    <span class="fw-medium">{{ data.donacion?.estadoArticulo?.descripcion ?? '—' }}</span>
                </div>
                <div class="col-6">
                    <small class="text-muted d-block">Solicitante</small>
                    <span class="fw-medium">{{ data.solicitante?.email ?? '—' }}</span>
                </div>
            </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end" class="px-4 pb-3 d-flex justify-content-between">
            <button mat-button (click)="onClose()">
                <mat-icon>close</mat-icon>
                Cancelar
            </button>
            <button mat-flat-button color="primary" (click)="onEntregar()" [disabled]="entregando()">
                @if (entregando()) {
                    <mat-spinner diameter="18" class="d-inline-block me-1"></mat-spinner>
                    Entregando...
                } @else {
                    <ng-container>
                        <mat-icon>check_circle</mat-icon>
                        Marcar como Entregado
                    </ng-container>
                }
            </button>
        </mat-dialog-actions>
    `,
    styles: ``
})
export class EntregarDetalleComponent {
    protected entregando = signal(false);

    constructor(
        public dialogRef: MatDialogRef<EntregarDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Solicitud,
        private solicitudService: SolicitudService
    ) { }

    onClose(): void {
        this.dialogRef.close();
    }

    onEntregar(): void {
        this.entregando.set(true);
        Alerts.Loading('Registrando entrega...');

        this.solicitudService.patchEntregarSolicitud(this.data.id)
            .then(() => {
                Alerts.Close();
                Alerts.Success('Entrega registrada exitosamente');
                this.dialogRef.close('entregado');
            })
            .catch((error) => {
                Alerts.Close();
                Alerts.Error(error?.error?.message || 'Error al registrar entrega');
            })
            .finally(() => {
                this.entregando.set(false);
            });
    }
}