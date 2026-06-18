import { Injectable } from '@angular/core';
import { AppService, IParam } from '../../../shared/services';
import { Sucursal } from '../models';
import { ApiResponseData } from '../../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class SucursalService {
    private readonly apiUrl = 'sucursales';
    constructor(private appService: AppService) { }

    getSucursales(soloActivos: boolean): Promise<ApiResponseData<Array<Sucursal>>> {
        const params: IParam = { name: 'soloActivos', value: soloActivos, type: 'params' };
        return this.appService.get<ApiResponseData<Array<Sucursal>>>(this.apiUrl, [params]);
    }
}