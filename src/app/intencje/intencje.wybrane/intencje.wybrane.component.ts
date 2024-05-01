import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HtmlRendererComponent } from '../../html-renderer/html-renderer.component';
import { formatDate } from '../../utils';

@Component({
  selector: 'app-intencje.wybrane',
  standalone: true,
  imports: [RouterModule, HtmlRendererComponent],
  templateUrl: './intencje.wybrane.component.html',
  styleUrl: './intencje.wybrane.component.css',
})
export class IntencjeWybraneComponent implements OnInit, OnDestroy {
  private httpClient = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private sub: Subscription | undefined;
  public buffer: ArrayBuffer | undefined;

  public content: string = '';
  public title: string = '';

  ngOnInit(): void {
    const that = this;
    that.sub = that.route.params.subscribe((params) => {
      that.title = `Intencje ${formatDate(params['date'])}`;
      that.httpClient
        .get(`assets/intencje/${params['date']}.html`, {
          responseType: 'arraybuffer',
        })
        .subscribe((buffer) => {
          that.buffer = buffer;
        });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
