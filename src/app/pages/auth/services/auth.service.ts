import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { Injectable, signal } from "@angular/core";
import { LoginRequest, UserAuthenticated, CreateUser } from "../models";
import { lastValueFrom } from "rxjs";
import { ApiResponseData } from "../../../shared/models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly tokenKey = environment.tokenName;
    private readonly apiUrl = `${environment.api}`;

    readonly currentUser = signal<UserAuthenticated | null>(this.loadUserFromStorage());

    constructor(private http: HttpClient, private router: Router) { }

    get isLoggedIn(): boolean {
        return !!this.currentUser();
    }

    get token(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    async login(request: LoginRequest): Promise<ApiResponseData<string>> {
        const response = await lastValueFrom(
            this.http.post<ApiResponseData<string>>(`${this.apiUrl}/users/login`, request)
        );
        const user = this.decodeToken(response.data);
        localStorage.setItem(this.tokenKey, response.data);
        this.currentUser.set(user);
        return response;
    }

    async register(request: CreateUser): Promise<ApiResponseData<string>> {
        const response = await lastValueFrom(
            this.http.post<ApiResponseData<string>>(`${this.apiUrl}/users`, request)
        );
        return response;
    }

    private decodeToken(token: string): UserAuthenticated {
        const payload = token.split('.')[1];
        const decoded: Record<string, any> = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

        return {
            nameidentifier: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            emailaddress: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            exp: decoded['exp'],
            iss: decoded['iss'],
            aud: decoded['aud'],
            token,
        };
    }

    logOut(): void {
        localStorage.removeItem(this.tokenKey);
        this.currentUser.set(null);
        this.router.navigate([environment.pathLogin]);
    }

    private loadUserFromStorage(): UserAuthenticated | null {
        try {
            const token = localStorage.getItem(this.tokenKey);
            return token ? this.decodeToken(token) : null;
        } catch {
            return null;
        }
    }
}
