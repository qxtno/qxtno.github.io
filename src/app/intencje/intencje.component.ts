import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import dayjs from 'dayjs';
import { HtmlRendererComponent } from '../html-renderer/html-renderer.component';
import { formatDate } from '../utils';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-intencje',
  standalone: true,
  imports: [RouterModule, HtmlRendererComponent],
  templateUrl: './intencje.component.html',
  styleUrl: './intencje.component.css',
})
export class IntencjeComponent implements OnInit {
  public intencje: string[] = [];
  public buffer: ArrayBuffer | undefined;
  public title: string = '';

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    const that = this;
    const title = 'Intencje';
    const tags = { name: 'keywords', content: 'intencje' };
    const description = { name: 'description', content: 'intencje' };
    this.metaService.updateTag(tags);
    this.metaService.updateTag(description);
    this.titleService.setTitle(title);
  }

  public formatDate(date: string) {
    return formatDate(date);
  }
}
