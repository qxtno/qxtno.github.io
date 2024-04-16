import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'karolsledz';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.metaService.updateTag({ name: 'author', content: 'karolsledz' });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'karolsledz,angular,portfolio',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index,follow' });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data) => {
          const description = data['description'];
          if (description) {
            this.metaService.updateTag({
              name: 'description',
              content: description,
            });
          } else {
            this.metaService.removeTag('name="description"');
          }
        });
      });
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
