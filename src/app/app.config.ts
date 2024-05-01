import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NotificationService } from './notification.service';

import dayjs from 'dayjs';
import 'dayjs/locale/pl';
dayjs.locale('pl');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    NotificationService,
    provideClientHydration(),
  ],
};
