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
  private httpClient = inject(HttpClient);

  public intencje: string[] = [];
  public buffer: ArrayBuffer | undefined;
  public title: string = '';

  ngOnInit(): void {
    const that = this;
    that.httpClient.get('assets/intencje.json').subscribe((data) => {
      const [date, ...intencje] = (data as string[]).filter((date) =>
        dayjs(date).isBefore(dayjs())
      );
      that.intencje = intencje;
      that.title = `Intencje ${formatDate(date)}`;

      that.httpClient
        .get(`assets/intencje/${date}.html`, {
          responseType: 'arraybuffer',
        })
        .subscribe((buffer) => {
          that.buffer = buffer;
        });
    });
  }

  public formatDate(date: string) {
    return formatDate(date);
  }
}
