import { Routes } from '@angular/router';
import { authGuard } from './pages/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    loadComponent: () => import('./pages/layout/layout').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'configuraciones',
        loadChildren: () => import('./pages/configuraciones/configuracion.routes').then(m => m.CONFIGURACIONES_ROUTES)
      },
      {
        path: 'donaciones',
        loadChildren: () => import('./pages/donaciones/donacion.routing').then(m => m.DONACIONES_ROUTES)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
