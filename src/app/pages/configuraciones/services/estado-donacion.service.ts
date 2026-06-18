import { Injectable } from '@angular/core';
import { AppService, IParam } from '../../../shared/services';
import { EstadoDonacion } from '../models';
import { ApiResponseData } from '../../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class EstadoDonacionService {
    private readonly apiUrl = 'estados-donacion';
    constructor(private appService: AppService) { }

    getEstadosDonacion(soloActivos: boolean): Promise<ApiResponseData<Array<EstadoDonacion>>> {
        const params: IParam = { name: 'soloActivos', value: soloActivos, type: 'params' };
        return this.appService.get<ApiResponseData<Array<EstadoDonacion>>>(this.apiUrl, [params]);
    }
}