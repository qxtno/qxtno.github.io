import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import dayjs from 'dayjs';
import { HtmlRendererComponent } from '../html-renderer/html-renderer.component';
import { formatDate } from '../utils';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ogloszenia',
  standalone: true,
  imports: [RouterModule, HtmlRendererComponent],
  templateUrl: './ogloszenia.component.html',
  styleUrl: './ogloszenia.component.css',
})
export class OgloszeniaComponent implements OnInit {
  private httpClient = inject(HttpClient);

  public ogloszenia: string[] = [];
  public buffer: ArrayBuffer | undefined;
  public title: string = '';

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    const that = this;
    const title = 'Ogłoszenia';
    const tags = { name: 'keywords', content: 'ogloszenia' };
    const description = { name: 'description', content: 'ogloszenia' };
    this.metaService.updateTag(tags);
    this.metaService.updateTag(description);
    this.titleService.setTitle(title);
  }

  formatDate(date: string) {
    return formatDate(date);
  }
}
