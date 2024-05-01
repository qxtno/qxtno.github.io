import { DOCUMENT } from '@angular/common';
import { Component, Input, OnDestroy, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-html-renderer',
  standalone: true,
  imports: [],
  templateUrl: './html-renderer.component.html',
  styleUrl: './html-renderer.component.css',
})
export class HtmlRendererComponent implements OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private document = inject(DOCUMENT);
  public content: string = '';

  @Input() set buffer(buffer: ArrayBuffer | undefined) {
    if (!buffer) {
      return;
    }
    const data = new TextDecoder('windows-1250').decode(buffer);
    const parser = new DOMParser();
    const html = parser.parseFromString(data, 'text/html');

    const bodyCollection = html.getElementsByTagName('body');
    const body = bodyCollection[0];
    if (body) {
      const wordSections = body.getElementsByClassName('WordSection1');
      const wordSection = wordSections[0];
      if (wordSection) {
        const removeEmptyTag = (
          node: Node | null,
          next: (node: Node | null) => Node | null
        ) => {
          if (!node) {
            return;
          }
          if (node.textContent?.trim() === '' && next(node)) {
            removeEmptyTag(next(node), next);
            wordSection.removeChild(node);
          }
        };
        removeEmptyTag(
          wordSection.lastChild,
          (node) => node?.previousSibling ?? null
        );
        removeEmptyTag(
          wordSection.firstChild,
          (node) => node?.nextSibling ?? null
        );
        if (wordSection.firstChild?.nodeName === 'TABLE') {
          wordSection.removeChild(wordSection.firstChild);
        }
      }

      this.content = this.sanitizer.bypassSecurityTrustHtml(
        body.innerHTML
      ) as string;
    }

    const dynamicStyles = this.document.getElementById('dynamic-styles');
    if (dynamicStyles) {
      const styles = html.getElementsByTagName('style');
      if (styles[0]) {
        dynamicStyles.innerHTML = styles[0].innerHTML;
      }
    }
  }

  ngOnDestroy(): void {
    const dynamicStyles = this.document.getElementById('dynamic-styles');
    if (dynamicStyles) {
      dynamicStyles.innerHTML = '';
    }
  }
}
