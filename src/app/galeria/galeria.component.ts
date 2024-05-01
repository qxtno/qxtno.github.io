import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Folder } from './folder';
import { FolderComponent } from './folder/folder.component';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [RouterModule, FolderComponent, MatIconModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
})
export class GaleriaComponent implements OnInit {
  private httpClient = inject(HttpClient);

  public folders: Folder[] = [];
  public selectedFolder: Folder | undefined;

  ngOnInit(): void {
    this.httpClient
      .get(`assets/zdjecia.json`, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.folders = JSON.parse(data);
      });
  }

  selectFolder(folder: Folder | undefined) {
    this.selectedFolder = folder;
  }
}
