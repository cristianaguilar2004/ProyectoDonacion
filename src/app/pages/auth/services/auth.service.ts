import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { Injectable, signal } from "@angular/core";
import { AuthUser, LoginRequest } from "../models";
import { lastValueFrom } from "rxjs";
import { ApiResponseData } from "../../../shared/models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly tokenKey = environment.tokenName;
    private readonly apiUrl = `${environment.api}`;

    readonly currentUser = signal<AuthUser | null>(this.loadUserFromStorage());

    constructor(private http: HttpClient, private router: Router) { }

    get isLoggedIn(): boolean {
        return !!this.currentUser();
    }

    get token(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    async login(request: LoginRequest): Promise<void> {
        const response = await lastValueFrom(
            this.http.post<ApiResponseData<string>>(`${this.apiUrl}/auth`, request)
        );

        const user = this.decodeToken(response.data);
        localStorage.setItem(this.tokenKey, response.data);
        this.currentUser.set(user);
    }

    private decodeToken(token: string): AuthUser {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return { ...decoded, token };
    }

    logOut(): void {
        localStorage.removeItem(this.tokenKey);
        this.currentUser.set(null);
        this.router.navigate([environment.pathLogin]);
    }

    private loadUserFromStorage(): AuthUser | null {
        try {
            const token = localStorage.getItem(this.tokenKey);
            return token ? this.decodeToken(token) : null;
        } catch {
            return null;
        }
    }
}
