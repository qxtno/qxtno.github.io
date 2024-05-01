import { Routes } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { HomeComponent } from './home/home.component';
import { IntencjeComponent } from './intencje/intencje.component';
import { IntencjeWybraneComponent } from './intencje/intencje.wybrane/intencje.wybrane.component';
import { NabozenstwaComponent } from './nabozenstwa/nabozenstwa.component';
import { OgloszeniaComponent } from './ogloszenia/ogloszenia.component';
import { OgloszeniaWybraneComponent } from './ogloszenia/ogloszenia.wybrane/ogloszenia.wybrane.component';

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
  { path: 'intencje/:date', component: IntencjeWybraneComponent },
  { path: 'ogloszenia', component: OgloszeniaComponent },
  { path: 'ogloszenia/:date', component: OgloszeniaWybraneComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'nabozenstwa', component: NabozenstwaComponent },
  { path: '**', redirectTo: '' },
];
