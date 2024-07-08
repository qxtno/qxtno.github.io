import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import dayjs from 'dayjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private httpClient = inject(HttpClient);
  public ogloszenia: string[] = [];
  public intencje: string[] = [];

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    const that = this;
    that.httpClient.get('assets/ogloszenia.json').subscribe((data) => {
      that.ogloszenia = data as string[];
    });
    that.httpClient.get('assets/intencje.json').subscribe((data) => {
      that.intencje = data as string[];
    });

    const title = 'Karolsledz pl';
    const tags = { name: 'keywords', content: 'strona glowna' };
    const description = { name: 'description', content: 'Strona glowna karolsledz pl' };
    this.metaService.updateTag(tags);
    this.metaService.updateTag(description);
    this.titleService.setTitle(title);
  }

  formatDate(date: string) {
    return dayjs(date).format('D MMMM YYYY');
  }
}
