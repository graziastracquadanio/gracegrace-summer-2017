import { Component } from '@angular/core';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  introLove: string[] = [
    'love making...~cooool things!',
    'love drawing with code.',
    'love to create new things.',
    'love to have fun coding.',
    'love making beautiful things.',
    'love making awesome things',
    'love to solve problems.',
    'love experiment new things.',
    '. . .',
    '. . .',
    '. . .',
    '. . .',
    '. . .',
    'will travel the world~~~!',
  ];

  constructor() {}
}
