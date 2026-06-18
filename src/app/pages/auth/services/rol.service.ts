import { Injectable } from '@angular/core';
import { AppService } from '../../../shared/services';
import { Rol } from '../models';
import { ApiResponseData } from '../../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class RoleService{
    private readonly apiUrl = 'roles';
    constructor(private appService: AppService) {}

    getRoles(): Promise<ApiResponseData<Array<Rol>>> {
        return this.appService.get<ApiResponseData<Array<Rol>>>(this.apiUrl);
    }
}