import { Injectable } from '@angular/core';
import { AppService, IParam } from '../../../shared/services';
import { Categoria } from '../models';
import { ApiResponseData } from '../../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private readonly apiUrl = 'categorias';
    constructor(private appService: AppService) { }

    getCategorias(soloActivos: boolean): Promise<ApiResponseData<Array<Categoria>>> {
        const params: IParam = { name: 'soloActivos', value: soloActivos, type: 'params' };
        return this.appService.get<ApiResponseData<Array<Categoria>>>(this.apiUrl, [params]);
    }

    PostCategoria(categoria: Categoria): Promise<ApiResponseData<Categoria>> {
        return this.appService.post<ApiResponseData<Categoria>>(this.apiUrl, JSON.stringify(categoria));
    }

    PutCategoria(categoria: Categoria): Promise<ApiResponseData<Categoria>> {
        return this.appService.put<ApiResponseData<Categoria>>(this.apiUrl, JSON.stringify(categoria));
    }

    PatchCategoria(categoriaId: string): Promise<ApiResponseData<Categoria>> {
        return this.appService.patch<ApiResponseData<Categoria>>(`${this.apiUrl}/${categoriaId}`, JSON.stringify({}));
    }
}