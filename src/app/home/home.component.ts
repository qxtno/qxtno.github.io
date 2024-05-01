import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
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

  ngOnInit(): void {
    const that = this;
    that.httpClient.get('assets/ogloszenia.json').subscribe((data) => {
      that.ogloszenia = data as string[];
    });
    that.httpClient.get('assets/intencje.json').subscribe((data) => {
      that.intencje = data as string[];
    });
  }

  formatDate(date: string) {
    return dayjs(date).format('D MMMM YYYY');
  }
}
