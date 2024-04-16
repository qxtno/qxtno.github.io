import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'karolsledz',
    data: { description: 'to jest strona główna' },
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
    title: 'Admin',
    data: { description: 'to jest strona admina' },
  },
  {
    path: 'details',
    component: DetailsComponent,
    title: 'Details',
    data: { description: 'to jest strona details' },
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
    data: { description: 'to jest strona about' },
  },
];
