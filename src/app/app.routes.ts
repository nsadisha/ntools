import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(p => p.HomeComponent),
    title: 'Ntools | Home',
    data: {
      title: "Home",
      subtitle: "Welcome to Ntools"
    }
  },
  {
    path: 'all',
    loadComponent: () => import('./pages/all-tools/all-tools.component').then(p => p.AllToolsComponent),
    title: 'Ntools | All Tools',
    data: {
      title: "All Tools",
      subtitle: "Search through all the tools"
    }
  },
  {
    path: 'tool/:code',
    loadComponent: () => import('./pages/display-tool/display-tool.component').then(p => p.DisplayToolComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/not-found/not-found.component').then(p => p.NotFoundComponent),
    title: 'Oops | Page Not Found...!!!',
    data: {
      title: "Page Not Found!",
      subtitle: "This page is removed or not found"
    }
  }
];
