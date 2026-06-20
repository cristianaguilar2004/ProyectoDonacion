import { Injectable } from '@angular/core';
import { AppService, IParam } from '../../../shared/services';
import { ApiResponseData } from '../../../shared/models';
import { Donacion } from '../models';

@Injectable({
    providedIn: 'root'
})
export class DonacionService {
    private readonly apiUrl = 'donaciones';
    constructor(private appService: AppService) { }

    getDonaciones (soloActivos: boolean): Promise<ApiResponseData<Array<Donacion>>> {
        const params: IParam = { name: 'soloActivos', value: soloActivos, type: 'params' };
        return this.appService.get<ApiResponseData<Array<Donacion>>>(this.apiUrl, [params]);
    }

    getDonacionesDisponibles (): Promise<ApiResponseData<Array<Donacion>>> {
        return this.appService.get<ApiResponseData<Array<Donacion>>>(`${this.apiUrl}/disponibles`);
    }

    getMisDonaciones (): Promise<ApiResponseData<Array<Donacion>>> {
        return this.appService.get<ApiResponseData<Array<Donacion>>>(`${this.apiUrl}/mis-donaciones`);
    }

    postDonacion(donacion: FormData): Promise<ApiResponseData<Donacion>> {
        return this.appService.post<ApiResponseData<Donacion>>(this.apiUrl, donacion);
    }

    patchDesactivarDonacion(id: string): Promise<ApiResponseData<Donacion>> {
        return this.appService.patch<ApiResponseData<Donacion>>(`${this.apiUrl}/${id}/desactivar`, JSON.stringify({}));
    }
}