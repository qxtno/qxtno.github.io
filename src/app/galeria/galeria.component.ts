import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Folder } from './folder';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
})
export class GaleriaComponent implements OnInit {
  private httpClient = inject(HttpClient);

  public folders: Folder[] = [];
  public selectedFolder: Folder | undefined;

  ngOnInit(): void {
  }

  selectFolder(folder: Folder | undefined) {
    this.selectedFolder = folder;
  }
}
