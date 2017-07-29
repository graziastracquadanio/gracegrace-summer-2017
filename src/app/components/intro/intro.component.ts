import { Component } from '@angular/core';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  introLove: string[] = [
    'love making cooool things',
    'love drawing with code.',
    'love creating new things.',
    'love to have fun coding.',
    'love to solve problems.',
    'love making beautiful things.',
    'love making awesome things',
    'love experiment new things.',
    '. . .',
    'will travel the world~~~!',
  ];

  constructor() {}
}
