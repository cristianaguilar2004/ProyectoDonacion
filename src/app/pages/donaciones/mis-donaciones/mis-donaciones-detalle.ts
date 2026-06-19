import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Donacion, Solicitud } from '../models';
import { SolicitudService } from '../services/solicitud.service';
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
    selector: 'app-mis-donaciones-detalle',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
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

                <!-- Solicitudes section -->
                <hr class="my-3" />
                <h5 class="fw-bold mb-3">Solicitudes recibidas</h5>

                @if (loadingSolicitudes()) {
                <div class="text-center py-3">
                    <mat-spinner diameter="28" class="d-inline-block"></mat-spinner>
                </div>
                } @else if (solicitudes.length === 0) {
                <p class="text-muted text-center py-3 mb-0">No hay solicitudes aún</p>
                } @else {
                <div class="table-responsive">
                    <table mat-table [dataSource]="solicitudes" class="w-100">

                        <ng-container matColumnDef="solicitante">
                            <th mat-header-cell *matHeaderCellDef class="fw-semibold">Solicitante</th>
                            <td mat-cell *matCellDef="let item">{{ item.solicitante?.nombre ?? '—' }}</td>
                        </ng-container>

                        <ng-container matColumnDef="email">
                            <th mat-header-cell *matHeaderCellDef class="fw-semibold">Email</th>
                            <td mat-cell *matCellDef="let item">{{ item.solicitante?.email ?? '—' }}</td>
                        </ng-container>

                        <ng-container matColumnDef="aceptada">
                            <th mat-header-cell *matHeaderCellDef class="fw-semibold">Estado</th>
                            <td mat-cell *matCellDef="let item">
                                <span [class.text-success]="item.aceptada" [class.text-muted]="!item.aceptada" class="fw-medium">
                                    {{ item.aceptada ? 'Aceptada' : 'Pendiente' }}
                                </span>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="acciones">
                            <th mat-header-cell *matHeaderCellDef class="fw-semibold">Acciones</th>
                            <td mat-cell *matCellDef="let item">
                                @if (!item.aceptada) {
                                <button mat-flat-button color="primary" size="small"
                                    (click)="onAceptar(item.id)">
                                    <mat-icon>check_circle</mat-icon>
                                    Aceptar
                                </button>
                                }
                            </td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="solicitudColumns"></tr>
                        <tr mat-row *matRowDef="let row; columns: solicitudColumns;"></tr>
                    </table>
                </div>
                }
            </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end" class="px-4 pb-3">
            <button mat-flat-button color="primary" (click)="onClose()">
                <mat-icon>close</mat-icon>
                Cerrar
            </button>
        </mat-dialog-actions>
    `,
    styles: `
        .detalle-imagen {
            width: 100%;
            max-height: 200px;
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
export class MisDonacionesDetalleComponent implements OnInit {
    protected solicitudes: Solicitud[] = [];
    protected solicitudColumns: string[] = ['solicitante', 'email', 'aceptada', 'acciones'];
    protected loadingSolicitudes = signal(false);

    constructor(
        public dialogRef: MatDialogRef<MisDonacionesDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Donacion,
        private solicitudService: SolicitudService,
    ) { 
    }

    ngOnInit(): void {
        this.onCargarSolicitudes();
    }

    onCargarSolicitudes(needsLoading: boolean = true): void {
        if (needsLoading) {
            this.loadingSolicitudes.set(true);
        }

        this.solicitudService.getSolicitudesByDonacion(this.data.id)
            .then(response => {
                this.solicitudes = response.data;
            })
            .catch(() => {
                Alerts.Error('Error al cargar solicitudes');
            })
            .finally(() => {
                this.loadingSolicitudes.set(false);
            });
    }

    onAceptar(solicitudId: string): void {
        Alerts.Loading('Aceptando solicitud...');

        this.solicitudService.patchAceptarSolicitud(solicitudId)
            .then((response) => {
                Alerts.Close();
                Alerts.Success(response.message || 'Solicitud aceptada exitosamente');
                this.dialogRef.close('aceptado');
            })
            .catch((error) => {
                Alerts.Error(error.error?.message || 'Error al aceptar solicitud');
            });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}