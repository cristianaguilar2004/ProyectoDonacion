import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NotificacionService } from '../services/notificacion.service';
import { Notificacion } from '../models';

@Component({
    selector: 'app-notificaciones-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
    ],
    template: `
    <div class="p-3" style="min-width: 380px; max-width: 480px;">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="fw-bold mb-0">Notificaciones</h5>
            @if (totalNoLeidas() > 0) {
            <button mat-stroked-button color="primary" (click)="onMarcarTodas()">
                Marcar todas leídas
            </button>
            }
        </div>

        <mat-divider></mat-divider>

        @if (notificaciones().length === 0) {
        <div class="text-center py-5">
            <mat-icon class="text-muted" style="font-size: 48px; width: 48px; height: 48px;">notifications_none</mat-icon>
            <p class="text-muted mt-2 mb-0">No hay notificaciones</p>
        </div>
        } @else {
        <div class="notif-list">
            @for (notif of notificaciones(); track notif.id) {
            <div class="notif-item" [class.notif-no-leida]="!notif.leida" (click)="onMarcarLeida(notif)">
                <div class="notif-icon">
                    @if (!notif.leida) {
                    <mat-icon class="text-primary">notifications_active</mat-icon>
                    } @else {
                    <mat-icon class="text-muted">notifications</mat-icon>
                    }
                </div>
                <div class="notif-content">
                    <p class="notif-mensaje" [class.fw-semibold]="!notif.leida">{{ notif.mensaje }}</p>
                    <small class="text-muted">{{ notif.fechaCreacion | date:'short' }}</small>
                </div>
                @if (!notif.leida) {
                <span class="notif-dot"></span>
                }
            </div>
            <mat-divider></mat-divider>
            }
        </div>
        }
    </div>
`,
    styles: `
    .notif-list {
        max-height: 480px;
        overflow-y: auto;
    }

    .notif-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 8px;
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.2s;
    }

    .notif-item:hover { background: #f5f5f5; }

    .notif-no-leida { background: #e8eaf6; }
    .notif-no-leida:hover { background: #dde0f5; }

    .notif-icon {
        flex-shrink: 0;
        margin-top: 2px;
    }

    .notif-content {
        flex: 1;
        min-width: 0;
    }

    .notif-mensaje {
        margin: 0 0 4px 0;
        font-size: 13px;
        line-height: 1.5;
        white-space: normal;   /* ← permite que el texto haga wrap */
        word-break: break-word;
        overflow: visible;
    }

    .notif-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #3f51b5;
        flex-shrink: 0;
        margin-top: 4px;
    }
`
})
export class NotificacionesDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<NotificacionesDialogComponent>,
        readonly notificacionService: NotificacionService  // ← readonly, sin signals propios
    ) { }

    // Delegamos directo al servicio
    get notificaciones() { return this.notificacionService.notificaciones; }
    get totalNoLeidas() { return this.notificacionService.totalNoLeidas; }

    onMarcarLeida(notif: Notificacion): void {
        if (!notif.leida) {
            this.notificacionService.marcarLeida(notif.id);
        }
    }

    onMarcarTodas(): void {
        this.notificacionService.marcarTodasLeidas();
    }

    onClose(): void {
        this.dialogRef.close();
    }
}