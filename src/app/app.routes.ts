import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: "karolsledz" },
    {
        path: 'admin',
        loadComponent: () =>
            import('./admin-panel/admin-panel.component').then(
                (m) => m.AdminPanelComponent
            ),
        title: "Admin"
    },
    { path: 'details', component: DetailsComponent, title: "Details" },
    { path: 'about', component: AboutComponent, title: "About" }
];