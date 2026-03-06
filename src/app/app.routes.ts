import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/pages/home/home.component').then(p => p.HomeComponent),
    title: 'Ntools | Home',
    data: {
      title: "Home",
      subtitle: "Welcome to Ntools"
    }
  },
  {
    path: 'tools',
    loadComponent: () => import('./ui/pages/all-tools/all-tools.component').then(p => p.AllToolsComponent),
    title: 'Ntools | All Tools',
    data: {
      title: "All Tools",
      subtitle: "Search through all the tools"
    }
  },
  {
    path: 'tool/:code',
    loadComponent: () => import('./ui/pages/display-tool/display-tool.component').then(p => p.DisplayToolComponent),
    data: {
      back: true
    }
  },
  {
    path: 'categories',
    loadComponent: () => import('./ui/pages/all-categories/all-categories.component').then(p => p.AllCategoriesComponent),
    title: 'Ntools | Categories',
    data: {
      title: "All Categories",
      subtitle: "Search through all the categories"
    }
  },
  {
    path: 'category/:type',
    loadComponent: () => import('./ui/pages/display-category/display-category.component').then(p => p.DisplayCategoryComponent),
    data: {
      back: true
    }
  },
  {
    path: 'contact',
    children: [
      {
        path: 'send-a-message',
        loadComponent: () => import('./ui/pages/contact/send-a-message/send-a-message.component').then(p => p.SendAMessageComponent),
        title: 'Ntools | Send Us a Message',
        data: {
          title: "Contact Us",
          subtitle: "Get in touch with us"
        },
      },
      {
        path: 'request-new-tool',
        loadComponent: () => import('./ui/pages/contact/request-new-tool/request-new-tool.component').then(p => p.RequestNewToolComponent),
        title: 'Ntools | Request a New Tool',
        data: {
          title: "Contact Us",
          subtitle: "Get in touch with us"
        },
      },
      {
        path: 'report-a-bug',
        loadComponent: () => import('./ui/pages/contact/report-a-bug/report-a-bug.component').then(p => p.ReportABugComponent),
        title: 'Ntools | Report a Bug',
        data: {
          title: "Contact Us",
          subtitle: "Get in touch with us"
        },
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./ui/pages/error/not-found/not-found.component').then(p => p.NotFoundComponent),
    title: 'Oops | Page Not Found...!!!',
    data: {
      title: "Page Not Found!",
      subtitle: "This page is removed or not found"
    }
  }
];
