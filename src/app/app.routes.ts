import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'admin',
        loadComponent: () =>
            import('./admin-panel/admin-panel.component').then(
                (m) => m.AdminPanelComponent
            ),
    },
    { path: 'details', component: DetailsComponent },
    { path: 'about', component: AboutComponent }
];