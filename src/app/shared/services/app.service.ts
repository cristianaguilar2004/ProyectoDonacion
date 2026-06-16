import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../pages/auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppService extends BaseService {
    constructor(protected override httpClient: HttpClient, private authService: AuthService) {
        super(httpClient, environment.api, () => { this.authService.logOut() });
    }
}