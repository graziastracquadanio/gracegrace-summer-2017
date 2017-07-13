import { Component } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  showNext: number = 0;

  constructor() {}

  printCv() {
    window.print();
  }
}
