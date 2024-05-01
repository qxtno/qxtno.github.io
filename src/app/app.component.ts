import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NotificationsOutletComponent } from './notifications-outlet/notifications-outlet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatIconModule,
    CommonModule,
    NotificationsOutletComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'strona';
  menuOpen = false;

  menuOptions = [
    { name: 'Strona główna', path: '/' },
    { name: 'Ogłoszenia', path: '/ogloszenia' },
    { name: 'Intencje', path: '/intencje' },
    { name: 'Nabożeństwa', path: '/nabozenstwa' },
    { name: 'Galeria', path: '/galeria' },
  ];

  toggle() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }
}
