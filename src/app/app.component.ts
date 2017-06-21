import { Component } from '@angular/core';
import { COLORS } from './commons/color-defs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  indexColor: number = 0;
  color: string = COLORS[0];

  constructor() {
  }

  generateRandomColor() {
    this.indexColor++;
    this.indexColor = this.indexColor === COLORS.length ? 0 : this.indexColor;
    this.color = COLORS[this.indexColor];
  }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

