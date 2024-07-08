import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Folder } from './folder';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title, private metaService: Meta) { 
    const title = 'Galeria';
    const tags = { name: 'keywords', content: 'galeria' };
    const description = { name: 'description', content: 'galeria' };
    this.metaService.updateTag(tags);
    this.metaService.updateTag(description);
    this.titleService.setTitle(title);
  }

  ngOnInit(): void {
  }

  selectFolder(folder: Folder | undefined) {
    this.selectedFolder = folder;
  }
}
