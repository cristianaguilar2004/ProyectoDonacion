import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../environments/environment';
import { AppService } from '../../../shared/services';
import { AuthService } from '../../auth/services/auth.service';
import { Notificacion } from '../models';
import { ApiResponseData } from '../../../shared/models';

@Injectable({ providedIn: 'root' })
export class NotificacionService {

    readonly notificaciones = signal<Notificacion[]>([]);
    readonly totalNoLeidas = signal<number>(0);

    private hub: signalR.HubConnection | null = null;

    constructor(
        private appService: AppService,
        private authService: AuthService
    ) { }

    conectar(usuarioId: string) {
        this.hub = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.api}/hubs/notificaciones`, {
                accessTokenFactory: () => this.authService.token ?? ''
            })
            .withAutomaticReconnect()
            .build();

        this.hub.on('NuevaNotificacion', (notif: Notificacion) => {
            this.notificaciones.update(prev => [notif, ...prev]);
            this.totalNoLeidas.update(n => n + 1);
        });

        this.hub.start()
            .then(() => {
                this.hub!.invoke('UnirseAGrupo', usuarioId);
                this.cargarNotificaciones();
            })
            .catch(err => console.error('SignalR error:', err));
    }

    private cargarNotificaciones() {
        this.appService.get<ApiResponseData<Notificacion[]>>('notificaciones/mis-notificaciones')
            .then(response => {
                if (response.data) {
                    this.notificaciones.set(response.data);
                    this.totalNoLeidas.set(response.data.filter(n => !n.leida).length);
                }
            })
            .catch(err => console.error('Error cargando notificaciones:', err));
    }

    marcarLeida(notificacionId: string) {
        this.appService.put<ApiResponseData<Notificacion>>(
            `notificaciones/${notificacionId}/marcar-leida`,
            JSON.stringify({})
        )
            .then(() => {
                this.notificaciones.update(prev =>
                    prev.map(n => n.id === notificacionId ? { ...n, leida: true } : n)
                );
                this.totalNoLeidas.update(n => Math.max(0, n - 1));
            })
            .catch(err => console.error('Error marcando notificación:', err));
    }

    marcarTodasLeidas() {
        this.notificaciones.update(prev => prev.map(n => ({ ...n, leida: true })));
        this.totalNoLeidas.set(0);
    }

    desconectar() {
        this.hub?.stop();
        this.hub = null;
    }
}