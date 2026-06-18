import { Injectable } from '@angular/core';
import { AppService, IParam } from '../../../shared/services';
import { EstadoArticulo } from '../models';
import { ApiResponseData } from '../../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class EstadoArticuloService {
    private readonly apiUrl = 'estados-articulo';
    constructor(private appService: AppService) { }

    getEstadosArticulo(soloActivos: boolean): Promise<ApiResponseData<Array<EstadoArticulo>>> {
        const params: IParam = { name: 'soloActivos', value: soloActivos, type: 'params' };
        return this.appService.get<ApiResponseData<Array<EstadoArticulo>>>(this.apiUrl, [params]);
    }
}