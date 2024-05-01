import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import dayjs from 'dayjs';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../notification.service';
import { BrowserStorageService } from '../storage.service';

const TOKEN_STORAGE_KEY = 'token';

function salt() {
  return `salt=${new Date().getTime()}`;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  private announcementsFile: File | undefined;
  private intentionsFile: File | undefined;
  private httpClient = inject(HttpClient);
  private notification = inject(NotificationService);
  private localStorage = inject(BrowserStorageService);

  private readonly owner = 'parafia-zolkiewka';
  private readonly repo = 'parafia-zolkiewka.github.io';
  private readonly branch = 'master';

  public apiKey: string = '';
  public date: string = '';
  public inputType: 'text' | 'password' = 'password';

  ngOnInit(): void {
    this.apiKey = this.localStorage.getItem(TOKEN_STORAGE_KEY) || '';
    this.date = dayjs().endOf('week').format('YYYY-MM-DD');
  }

  toggleInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  private saveTokenToStorage(token: string) {
    this.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  async onUpload() {
    (async () => {
      if (!this.apiKey) {
        throw new Error('Nie wypełniono pola "Token"');
      }

      const dayjsDate = dayjs(this.date, 'YYYY-MM-DD');
      if (
        !dayjsDate.isValid() ||
        dayjsDate.format('YYYY-MM-DD') !== this.date
      ) {
        throw new Error('Brak lub nieprawidłowy format daty');
      }

      if (!this.announcementsFile && !this.intentionsFile) {
        throw new Error('Nie wybrano żadnego pliku');
      }
      if (this.announcementsFile) {
        await this.fetchAndUpdateFile(this.announcementsFile, 'ogloszenia')
          .then(() => {
            this.notification.addNotification({
              type: 'success',
              message: 'Ogłoszenia zostały zaktualizowane',
            });
          })
          .catch((error) => {
            console.error(error);
            this.notification.addNotification({
              type: 'error',
              message: 'Błąd podczas aktualizacji pliku ogłoszeń',
            });
          });
      }
      if (this.intentionsFile) {
        await this.fetchAndUpdateFile(this.intentionsFile, 'intencje')
          .then(() => {
            this.notification.addNotification({
              type: 'success',
              message: 'Intencje zostały zaktualizowane',
            });
          })
          .catch((error) => {
            console.error(error);
            this.notification.addNotification({
              type: 'error',
              message: 'Błąd podczas aktualizacji pliku intencji',
            });
          });
      }
      await this.onReloadContent();
    })().catch((error) => {
      console.error(error);
      this.notification.addNotification({
        type: 'error',
        message: error.message,
      });
    });
  }

  private async fetchAndUpdateFile(file: File, location: string) {
    const token = this.apiKey;
    const date = this.date;
    const path = `src/assets/${location}/${date}.html`;

    try {
      const response = await firstValueFrom(
        this.httpClient.get<{ sha: string }>(
          `https://api.github.com/repos/${this.owner}/${
            this.repo
          }/contents/${path}?ref=${this.branch}&${salt()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );
      console.log('Updating existing file');
      await this.updateFile(file, location, date, path, token, response.sha);
    } catch (error) {
      console.log('Creating a new file');
      await this.updateFile(file, location, date, path, token, null);
    }
  }

  private async base64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      if (!file) {
        return reject();
      }
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const string = reader.result as string;
        resolve(string.split(',')[1]);
      };
    });
  }

  private async updateFile(
    file: File,
    location: string,
    date: string,
    path: string,
    token: string,
    sha: string | null
  ) {
    this.saveTokenToStorage(token);
    const value = await firstValueFrom(
      this.httpClient.put(
        `https://api.github.com/repos/${this.owner}/${
          this.repo
        }/contents/${path}?${salt()}`,
        {
          message: `upload file ${location}/${date}.html [skip ci]`,
          content: await this.base64(file),
          branch: this.branch,
          sha: sha,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
    console.log('success', value);
  }

  async onReloadContent() {
    (async () => {
      if (!this.apiKey) {
        throw new Error('Nie wypełniono pola "Token"');
      }

      const path = 'date.txt';
      const token = this.apiKey;
      const date = new Date().toISOString();

      try {
        const response = await firstValueFrom(
          this.httpClient.get<{ sha: string }>(
            `https://api.github.com/repos/${this.owner}/${
              this.repo
            }/contents/${path}?ref=${this.branch}&${salt()}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );
        console.log('Updating existing file');
        await this.reloadContent(path, date, response.sha, token);
      } catch (error) {
        console.log('Creating a new file');
        await this.reloadContent(path, date, null, token);
      }
    })()
      .then(() => {
        this.notification.addNotification({
          type: 'success',
          message: 'Zlecono automatyczną aktualizację strony',
        });
      })
      .catch((error) => {
        this.notification.addNotification({
          type: 'error',
          message: error.message,
        });
      });
  }

  private async reloadContent(
    path: string,
    dateString: string,
    sha: string | null,
    token: string
  ) {
    this.saveTokenToStorage(token);
    const response = await firstValueFrom(
      this.httpClient.put(
        `https://api.github.com/repos/${this.owner}/${
          this.repo
        }/contents/${path}?${salt()}`,
        {
          message: `Reload content ${dateString}`,
          content: await this.base64(new File([dateString], 'date.txt')),
          branch: this.branch,
          sha: sha, // Include sha if available, otherwise it will be omitted
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
    console.log('Content reload triggered successfully', response);
  }

  onAnnouncementsFileChange($event: Event) {
    this.announcementsFile = ($event.target as HTMLInputElement).files?.[0];
  }

  onIntentionsFileChange($event: Event) {
    this.intentionsFile = ($event.target as HTMLInputElement).files?.[0];
  }
}
