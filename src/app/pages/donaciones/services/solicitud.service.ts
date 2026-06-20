import { Injectable } from '@angular/core';
import { AppService } from '../../../shared/services';
import { Solicitud } from '../models';
import { ApiResponseData } from '../../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    private readonly apiUrl = 'solicitudes';

    constructor(private appService: AppService) { }

    postSolicitudes(donacionId: string) : Promise<ApiResponseData<Solicitud>> {
        const body = { donacionId: donacionId };
        return this.appService.post<ApiResponseData<Solicitud>>(`${this.apiUrl}`, JSON.stringify(body));
    }

    getSolicitudesByDonacion(donacionId: string) : Promise<ApiResponseData<Solicitud[]>> {
        return this.appService.get<ApiResponseData<Solicitud[]>>(`${this.apiUrl}/donacion/${donacionId}`);  
    }

    getSolicitudesAceptadas() : Promise<ApiResponseData<Solicitud[]>> {
        return this.appService.get<ApiResponseData<Solicitud[]>>(`${this.apiUrl}/aceptadas`);  
    }

    patchAceptarSolicitud(solicitudId: string) : Promise<ApiResponseData<Solicitud>> {
        return this.appService.patch<ApiResponseData<Solicitud>>(`${this.apiUrl}/${solicitudId}/aceptar`, JSON.stringify({}));
    }

    patchEntregarSolicitud(solicitudId: string) : Promise<ApiResponseData<Solicitud>> {
        return this.appService.patch<ApiResponseData<Solicitud>>(`${this.apiUrl}/${solicitudId}/entregar`, JSON.stringify({}));
    }
}