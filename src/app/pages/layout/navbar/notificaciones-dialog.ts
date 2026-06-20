import { Component, Inject, signal } from '@angular/core';
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
        <div class="p-3" style="min-width: 350px; max-width: 450px;">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h5 class="fw-bold mb-0">Notificaciones</h5>
                @if (totalNoLeidas() > 0) {
                <button mat-stroked-button color="primary" size="small" (click)="onMarcarTodas()">
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
            <mat-list class="pt-2">
                @for (notif of notificaciones(); track notif.id) {
                <mat-list-item class="notif-item" [class.notif-no-leida]="!notif.leida"
                    (click)="onMarcarLeida(notif)">
                    <div class="d-flex align-items-start gap-2 py-1" style="cursor: pointer;">
                        <div class="mt-1">
                            @if (!notif.leida) {
                            <mat-icon class="text-primary" style="font-size: 20px;">notifications_active</mat-icon>
                            } @else {
                            <mat-icon class="text-muted" style="font-size: 20px;">notifications</mat-icon>
                            }
                        </div>
                        <div class="flex-grow-1 min-w-0">
                            <p class="mb-0 small" [class.fw-semibold]="!notif.leida">{{ notif.mensaje }}</p>
                            <small class="text-muted">{{ notif.fechaCreacion | date:'short' }}</small>
                        </div>
                        @if (!notif.leida) {
                        <span class="notif-dot"></span>
                        }
                    </div>
                </mat-list-item>
                <mat-divider></mat-divider>
                }
            </mat-list>
            }
        </div>
    `,
    styles: `
        .notif-item { cursor: pointer; transition: background 0.2s; }
        .notif-item:hover { background: #f5f5f5; border-radius: 8px; }
        .notif-no-leida { background: #e8eaf6; border-radius: 8px; }
        .notif-dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: #3f51b5; display: inline-block; flex-shrink: 0;
        }
    `
})
export class NotificacionesDialogComponent {
    protected notificaciones = signal<Notificacion[]>([]);
    protected totalNoLeidas = signal(0);

    constructor(
        public dialogRef: MatDialogRef<NotificacionesDialogComponent>,
        private notificacionService: NotificacionService
    ) {
        this.notificaciones.set(this.notificacionService.notificaciones());
        this.totalNoLeidas.set(this.notificacionService.totalNoLeidas());
    }

    onMarcarLeida(notif: Notificacion): void {
        if (!notif.leida) {
            this.notificacionService.marcarLeida(notif.id);
            this.notificaciones.update(prev =>
                prev.map(n => n.id === notif.id ? { ...n, leida: true } : n)
            );
            this.totalNoLeidas.update(n => Math.max(0, n - 1));
        }
    }

    onMarcarTodas(): void {
        this.notificacionService.marcarTodasLeidas();
        this.notificaciones.update(prev => prev.map(n => ({ ...n, leida: true })));
        this.totalNoLeidas.set(0);
    }

    onClose(): void {
        this.dialogRef.close();
    }
}