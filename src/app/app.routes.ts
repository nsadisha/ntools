import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(p => p.HomeComponent),
    title: 'Ntools | Home'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/not-found/not-found.component').then(p => p.NotFoundComponent),
    title: 'Oops | Page Not Found...!!!'
  }
];
