import { loadRemoteModule } from '@nx/angular/mf';
import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule('login', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'bookstore',
    loadChildren: () =>
      loadRemoteModule('bookstore', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    component: NxWelcome,
  },
];
