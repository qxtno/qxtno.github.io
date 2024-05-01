import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notifications-outlet',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './notifications-outlet.component.html',
  styleUrl: './notifications-outlet.component.css',
})
export class NotificationsOutletComponent {
  public notificationService = inject(NotificationService);

  public removeNotification(id: string) {
    this.notificationService.removeNotification(id);
  }
}
