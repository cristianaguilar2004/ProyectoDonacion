import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./views/auth/auth.routes').then(m => m.AUTH_ROUTES)
    // },
    // {
    //     path: '',
    //     canActivate: [authGuard],
    //     runGuardsAndResolvers: 'always',
    //     children: [
    //         {
    //             path: 'dashboard',
    //             loadChildren: () => import('./views/layout/layout.routes').then(m => m.LAYOUT_ROUTES)
    //         },
    //         {
    //             path: 'administracion',
    //             loadChildren: () => import('./views/administracion/administracion.routes').then(m => m.ADMINISTRACION_ROUTES)
    //         },
    //         {
    //             path: 'emergencias',
    //             loadChildren: () => import('./views/emergencia/emergencia.routes').then(m => m.EMERGENCIA_ROUTES)
    //         }
    //     ]

    // },
    // { path: '**', redirectTo: 'auth/login' }
];

