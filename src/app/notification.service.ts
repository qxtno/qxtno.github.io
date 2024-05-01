import { Injectable } from '@angular/core';

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifications: Notification[] = [];

  constructor() {}

  public addNotification(notification: Omit<Notification, 'id'>) {
    this.notifications.push({ id: getId(), ...notification });
  }

  public removeNotification(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }
}

function getId(): string {
  return `${new Date().getTime()}-${Math.random()}`;
}
