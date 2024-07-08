import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nabozenstwa',
  standalone: true,
  imports: [],
  templateUrl: './nabozenstwa.component.html',
  styleUrl: './nabozenstwa.component.css'
})
export class NabozenstwaComponent {
  constructor(private titleService: Title, private metaService: Meta) { 
    const title = 'Nabożenstwa';
    const tags = { name: 'keywords', content: 'nabozenstwa' };
    const description = { name: 'description', content: 'nabozenstwa' };
    this.metaService.updateTag(tags);
    this.metaService.updateTag(description);
    this.titleService.setTitle(title);
  }
}
