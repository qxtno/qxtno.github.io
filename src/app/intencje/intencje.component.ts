import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import dayjs from 'dayjs';
import { HtmlRendererComponent } from '../html-renderer/html-renderer.component';
import { formatDate } from '../utils';

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

  ngOnInit(): void {
    const that = this;
  }

  public formatDate(date: string) {
    return formatDate(date);
  }
}
