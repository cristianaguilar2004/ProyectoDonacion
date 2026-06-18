import { Routes } from '@angular/router';

export const CONFIGURACIONES_ROUTES: Routes = [
    {
        path: 'categorias',
        loadComponent: () => import('./categoria/categoria').then(m => m.CategoriaComponent)
    }
];