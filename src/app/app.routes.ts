import { Routes } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { HomeComponent } from './home/home.component';
import { IntencjeComponent } from './intencje/intencje.component';
import { NabozenstwaComponent } from './nabozenstwa/nabozenstwa.component';
import { OgloszeniaComponent } from './ogloszenia/ogloszenia.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
  },
  { path: 'intencje', component: IntencjeComponent },
  { path: 'ogloszenia', component: OgloszeniaComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'nabozenstwa', component: NabozenstwaComponent },
  { path: '**', redirectTo: '' },
];
