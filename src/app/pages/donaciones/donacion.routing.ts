import { Routes } from '@angular/router';

export const DONACIONES_ROUTES: Routes = [
    {
        path: 'donaciones',
        loadComponent: () => import('./donaciones/donaciones').then(m => m.Donaciones)
    }
];