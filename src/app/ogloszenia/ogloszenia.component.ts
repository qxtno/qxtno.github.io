import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import dayjs from 'dayjs';
import { HtmlRendererComponent } from '../html-renderer/html-renderer.component';
import { formatDate } from '../utils';

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

  ngOnInit(): void {
    const that = this;
  }

  formatDate(date: string) {
    return formatDate(date);
  }
}
