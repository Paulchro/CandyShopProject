import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(@Inject(DOCUMENT) private document: Document, private render: Renderer2) {}

  ngOnInit() {
    this.render.addClass(this.document.body, 'lightTheme')
  }
}
