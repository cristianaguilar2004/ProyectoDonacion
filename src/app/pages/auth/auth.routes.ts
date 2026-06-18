import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(m => m.Login),
        canActivate: [loginGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register').then(m => m.Register),
        canActivate: [loginGuard]
    }
];
