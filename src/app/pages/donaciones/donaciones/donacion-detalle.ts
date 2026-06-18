import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Donacion } from '../models';

@Component({
    selector: 'app-donacion-detalle',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
    ],
    template: `
        <mat-dialog-content class="p-0">
            <!-- Image -->
            @if (data.urlImagen) {
            <div class="detalle-imagen">
                <img [src]="data.urlImagen" [alt]="data.nombreArticulo" />
            </div>
            }

            <div class="p-4">
                <!-- Title -->
                <h3 class="fw-bold mb-1">{{ data.nombreArticulo }}</h3>
                <p class="text-muted small mb-3">Publicado {{ data.fechaCreacion | date:'mediumDate' }}</p>

                <!-- Description -->
                <p class="mb-3">{{ data.descripcionArticulo }}</p>

                <!-- Details Grid -->
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
    constructor(
        public dialogRef: MatDialogRef<DonacionDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Donacion
    ) { }

    onClose(): void {
        this.dialogRef.close();
    }
}