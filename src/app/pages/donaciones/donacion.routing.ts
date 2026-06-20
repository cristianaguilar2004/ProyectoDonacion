import { Routes } from '@angular/router';

export const DONACIONES_ROUTES: Routes = [
    {
        path: 'donaciones',
        loadComponent: () => import('./donaciones/donaciones').then(m => m.Donaciones)
    },
    {
        path: 'crear',
        loadComponent: () => import('./crear-donacion/crear-donacion').then(m => m.CrearDonacion)
    },
    {
        path: 'mis-donaciones',
        loadComponent: () => import('./mis-donaciones/mis-donaciones').then(m => m.MisDonaciones)
    },
    {
        path: 'entregar-donaciones',
        loadComponent: () => import('./entregar-donaciones/entregar-donaciones').then(m => m.EntregarDonaciones)
    }
];