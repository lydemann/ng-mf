import { Routes } from '@angular/router';
import { RemoteEntryComponent } from './entry';
import { BookstoreComponent } from '../components/bookstore.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        component: BookstoreComponent,
      },
    ],
  },
];
